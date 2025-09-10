import { supabaseAdmin } from './db';

export interface ErrorReport {
  id?: string;
  message: string;
  stack?: string;
  url?: string;
  userAgent?: string;
  userId?: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  tags: Record<string, string>;
  context?: Record<string, any>;
  resolved?: boolean;
  resolved_at?: string;
}

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const;

// Client-safe error capture (doesn't use server-side database)
export function captureErrorClient(
  error: Error | string,
  context?: {
    severity?: keyof typeof ERROR_SEVERITY;
    tags?: Record<string, string>;
    userId?: string;
    url?: string;
    userAgent?: string;
    additionalContext?: Record<string, any>;
  }
): void {
  try {
    const errorMessage = error instanceof Error ? error.message : error;
    const stack = error instanceof Error ? error.stack : undefined;

    const report = {
      message: errorMessage,
      stack,
      url: context?.url || (typeof window !== 'undefined' ? window.location.href : undefined),
      userAgent: context?.userAgent || (typeof window !== 'undefined' ? navigator.userAgent : undefined),
      userId: context?.userId,
      timestamp: new Date().toISOString(),
      severity: context?.severity ? ERROR_SEVERITY[context.severity] : ERROR_SEVERITY.MEDIUM,
      tags: context?.tags || {},
      context: context?.additionalContext
    };

    // Send to server-side error handler via fetch
    if (typeof window !== 'undefined') {
      fetch('/api/errors/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      }).catch(fetchError => {
        console.error('Failed to send error report to server:', fetchError);
        console.error('Error captured (client fallback):', report);
      });
    }

    // Always log to console
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Captured (Client)');
      console.error('Message:', report.message);
      console.error('Severity:', report.severity);
      console.error('URL:', report.url);
      if (report.stack) console.error('Stack:', report.stack);
      if (report.context) console.error('Context:', report.context);
      console.groupEnd();
    }

  } catch (captureError) {
    // Last resort - log to console
    console.error('Failed to capture error:', captureError);
    console.error('Original error:', error);
  }
}

// Server-side error capture (uses database)
export async function captureError(
  error: Error | string,
  context?: {
    severity?: keyof typeof ERROR_SEVERITY;
    tags?: Record<string, string>;
    userId?: string;
    url?: string;
    userAgent?: string;
    additionalContext?: Record<string, any>;
  }
): Promise<void> {
  try {
    const errorMessage = error instanceof Error ? error.message : error;
    const stack = error instanceof Error ? error.stack : undefined;

    const report: Omit<ErrorReport, 'id'> = {
      message: errorMessage,
      stack,
      url: context?.url || (typeof window !== 'undefined' ? window.location.href : undefined),
      userAgent: context?.userAgent || (typeof window !== 'undefined' ? navigator.userAgent : undefined),
      userId: context?.userId,
      timestamp: new Date().toISOString(),
      severity: context?.severity ? ERROR_SEVERITY[context.severity] : ERROR_SEVERITY.MEDIUM,
      tags: context?.tags || {},
      context: context?.additionalContext,
      resolved: false
    };

    // Store in database
    const { error: dbError } = await supabaseAdmin
      .from('error_reports')
      .insert(report);

    if (dbError) {
      console.error('Failed to store error report:', dbError);
      // Fallback to console logging
      console.error('Error captured:', report);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Captured (Server)');
      console.error('Message:', report.message);
      console.error('Severity:', report.severity);
      console.error('URL:', report.url);
      if (report.stack) console.error('Stack:', report.stack);
      if (report.context) console.error('Context:', report.context);
      console.groupEnd();
    }

    // For critical errors, also log audit event
    if (report.severity === ERROR_SEVERITY.CRITICAL) {
      await supabaseAdmin.from('audit_log').insert({
        actor: 'system',
        action: 'critical_error',
        entity: 'error_reports',
        entity_id: report.timestamp,
        meta: {
          message: report.message,
          severity: report.severity,
          url: report.url
        }
      });
    }

  } catch (captureError) {
    // Last resort - log to console
    console.error('Failed to capture error:', captureError);
    console.error('Original error:', error);
  }
}

// Utility function to wrap async operations with error monitoring
export async function withErrorMonitoring<T>(
  operation: () => Promise<T>,
  context?: {
    operation?: string;
    severity?: keyof typeof ERROR_SEVERITY;
    tags?: Record<string, string>;
    userId?: string;
  }
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    await captureError(error as Error, {
      ...context,
      tags: {
        operation: context?.operation || 'unknown',
        ...context?.tags
      }
    });
    return null;
  }
}

// React error boundary hook (client-safe)
export function useErrorMonitoring() {
  const reportError = (
    error: Error,
    errorInfo?: { componentStack?: string },
    context?: Record<string, any>
  ) => {
    captureErrorClient(error, {
      severity: 'HIGH',
      tags: { type: 'react_error' },
      additionalContext: {
        componentStack: errorInfo?.componentStack,
        ...context
      }
    });
  };

  return { reportError };
}

// API error wrapper
export async function apiErrorHandler(
  handler: () => Promise<Response>,
  context?: {
    endpoint?: string;
    userId?: string;
  }
): Promise<Response> {
  try {
    return await handler();
  } catch (error) {
    await captureError(error as Error, {
      severity: 'HIGH',
      tags: {
        type: 'api_error',
        endpoint: context?.endpoint
      },
      userId: context?.userId
    });

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Get error reports for monitoring dashboard
export async function getErrorReports(
  filters?: {
    severity?: string;
    resolved?: boolean;
    limit?: number;
    offset?: number;
  }
) {
  try {
    let query = supabaseAdmin
      .from('error_reports')
      .select('*', { count: 'exact' })
      .order('timestamp', { ascending: false });

    if (filters?.severity) {
      query = query.eq('severity', filters.severity);
    }

    if (filters?.resolved !== undefined) {
      query = query.eq('resolved', filters.resolved);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 50)) - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      reports: data || [],
      total: count || 0
    };
  } catch (error) {
    console.error('Error fetching error reports:', error);
    return { reports: [], total: 0 };
  }
}

// Mark error as resolved
export async function resolveError(errorId: string, resolvedBy: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('error_reports')
      .update({
        resolved: true,
        resolved_at: new Date().toISOString()
      })
      .eq('id', errorId);

    if (error) return false;

    // Log audit event
    await supabaseAdmin.from('audit_log').insert({
      actor: resolvedBy,
      action: 'resolve_error',
      entity: 'error_reports',
      entity_id: errorId,
      meta: { resolved_at: new Date().toISOString() }
    });

    return true;
  } catch (error) {
    console.error('Error resolving error report:', error);
    return false;
  }
}

// Client-side error monitoring (safe for browser use)

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

// Alias for backward compatibility
export const captureError = captureErrorClient;

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

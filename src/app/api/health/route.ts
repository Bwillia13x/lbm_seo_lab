import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  const startTime = Date.now();

  try {
    // Check database connectivity
    const { data: dbHealth, error: dbError } = await supabaseAdmin
      .from('global_settings')
      .select('id')
      .limit(1);

    const dbStatus = dbError ? 'error' : 'healthy';
    const dbLatency = Date.now() - startTime;

    // Check environment variables
    const envChecks = {
      supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabase_service_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      stripe_secret_key: !!process.env.STRIPE_SECRET_KEY,
      stripe_webhook_secret: !!process.env.STRIPE_WEBHOOK_SECRET,
      resend_api_key: !!process.env.RESEND_API_KEY,
      business_email: !!process.env.BUSINESS_EMAIL,
      site_url: !!process.env.NEXT_PUBLIC_SITE_URL,
      airbnb_ical_url: !!process.env.AIRBNB_ICAL_URL
    };

    const envStatus = Object.values(envChecks).every(Boolean) ? 'healthy' : 'warning';
    const missingEnvVars = Object.entries(envChecks)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    // Check recent system activity
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recentLogs, error: logsError } = await supabaseAdmin
      .from('audit_log')
      .select('id')
      .gte('ts', fiveMinutesAgo)
      .limit(1);

    const activityStatus = logsError ? 'error' : recentLogs?.length ? 'active' : 'idle';

    // Check webhook health (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentWebhooks, error: webhookError } = await supabaseAdmin
      .from('stripe_events')
      .select('processed, error_message')
      .gte('received_at', oneDayAgo);

    const webhookStats = recentWebhooks?.reduce((acc, webhook) => {
      if (webhook.processed) acc.successful++;
      else if (webhook.error_message) acc.failed++;
      else acc.pending++;
      return acc;
    }, { successful: 0, failed: 0, pending: 0 }) || { successful: 0, failed: 0, pending: 0 };

    const webhookStatus = webhookError ? 'error' :
      webhookStats.failed > 0 ? 'warning' : 'healthy';

    // Overall system status
    const statuses = [dbStatus, envStatus, activityStatus, webhookStatus];
    const overallStatus = statuses.includes('error') ? 'error' :
      statuses.includes('warning') ? 'warning' : 'healthy';

    const response = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: "1.0.0",

      checks: {
        database: {
          status: dbStatus,
          latency_ms: dbLatency,
          message: dbError ? `Database error: ${dbError.message}` : 'Connected successfully'
        },

        environment: {
          status: envStatus,
          message: envStatus === 'healthy' ?
            'All required environment variables are set' :
            `Missing variables: ${missingEnvVars.join(', ')}`
        },

        activity: {
          status: activityStatus,
          message: activityStatus === 'active' ?
            'Recent system activity detected' :
            'No recent activity (system may be idle)'
        },

        webhooks: {
          status: webhookStatus,
          message: webhookError ?
            `Webhook error: ${webhookError.message}` :
            `Last 24h: ${webhookStats.successful} successful, ${webhookStats.failed} failed, ${webhookStats.pending} pending`
        }
      },

      recommendations: []
    };

    // Add recommendations based on issues
    if (dbStatus === 'error') {
      response.recommendations.push('Check database connectivity and credentials');
    }
    if (envStatus === 'warning') {
      response.recommendations.push('Configure missing environment variables');
    }
    if (activityStatus === 'idle') {
      response.recommendations.push('System appears inactive - check cron jobs');
    }
    if (webhookStats.failed > 0) {
      response.recommendations.push(`Review ${webhookStats.failed} failed webhook(s)`);
    }

    const statusCode = overallStatus === 'error' ? 500 :
      overallStatus === 'warning' ? 200 : 200;

    return NextResponse.json(response, { status: statusCode });

  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

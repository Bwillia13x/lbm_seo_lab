import { NextRequest, NextResponse } from 'next/server';
import { captureError } from '@/lib/error-monitoring';

export async function POST(req: NextRequest) {
  try {
    const errorReport = await req.json();

    // Validate the error report
    if (!errorReport.message) {
      return NextResponse.json(
        { error: 'Invalid error report: message is required' },
        { status: 400 }
      );
    }

    // Convert the client error report to our format and capture it server-side
    await captureError(errorReport.message, {
      severity: errorReport.severity,
      tags: errorReport.tags,
      userId: errorReport.userId,
      url: errorReport.url,
      userAgent: errorReport.userAgent,
      additionalContext: {
        ...errorReport.context,
        stack: errorReport.stack,
        clientSide: true,
        timestamp: errorReport.timestamp
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error processing client error report:', error);
    return NextResponse.json(
      { error: 'Failed to process error report' },
      { status: 500 }
    );
  }
}

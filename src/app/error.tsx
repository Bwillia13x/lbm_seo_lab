'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  useEffect(() => {
    // Optionally log error to monitoring; ErrorBoundary already reports
    // console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full elevated-card">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h1 className="text-lg font-semibold">Something went wrong</h1>
              <p className="text-sm text-muted-foreground">The error has been reported. You can try again below.</p>
              <div className="flex justify-center">
                <Button onClick={reset} className="inline-flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <pre className="text-xs text-left bg-gray-100 p-2 rounded overflow-auto">
{error.message}
{error.digest ? `\nDigest: ${error.digest}` : ''}
                </pre>
              )}
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}

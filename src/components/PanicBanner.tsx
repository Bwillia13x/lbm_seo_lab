'use client';

import { useEffect, useState } from 'react';

export default function PanicBanner() {
  const [panicMode, setPanicMode] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const dismissedFlag = sessionStorage.getItem('panicBannerDismissed');
    setDismissed(dismissedFlag === '1');
  }, []);

  useEffect(() => {
    // Check panic mode status
    const checkPanicMode = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        setPanicMode(data.settings?.panic_mode || false);
      } catch (error) {
        console.error('Failed to check panic mode:', error);
      }
    };

    checkPanicMode();
    // Check every 30 seconds
    const interval = setInterval(checkPanicMode, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!panicMode || dismissed) return null;

  return (
    <div
      className="bg-red-600 text-white text-center py-2 text-sm fixed top-0 left-0 right-0 z-50 shadow-lg"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
        <span>Ordering is temporarily paused while we manage capacity. Thanks for understanding.</span>
        <button
          type="button"
          className="ml-2 underline/50 hover:underline focus-ring rounded"
          onClick={() => { sessionStorage.setItem('panicBannerDismissed', '1'); setDismissed(true); }}
          aria-label="Dismiss announcement"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

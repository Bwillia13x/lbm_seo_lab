'use client';

import { useEffect, useState } from 'react';

export default function PanicBanner() {
  const [panicMode, setPanicMode] = useState(false);

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

  if (!panicMode) return null;

  return (
    <div className="bg-red-600 text-white text-center py-2 text-sm fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        Ordering is temporarily paused while we manage capacity. Thanks for understanding.
      </div>
    </div>
  );
}

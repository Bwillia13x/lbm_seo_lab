export type ToastVariant = 'default' | 'success' | 'error' | 'warn' | 'destructive'

export type ToastDetail = { message: string; variant?: ToastVariant };

export function showToast(message: string, variant: ToastVariant = 'default') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<ToastDetail>('belmont_toast', { detail: { message, variant } } as any));
  try {
    // Fallback visual toast
    console.log(`[toast:${variant}] ${message}`);
  } catch {}
}

// Minimal hook-compatible API used across the app
export function useToast() {
  function toast(args: { title: string; description?: string; variant?: ToastVariant }) {
    const parts = [args.title, args.description].filter(Boolean).join(' — ');
    showToast(parts, args.variant || 'default');
    if (typeof window !== 'undefined') {
      // Lightweight, non-blocking notice
      // eslint-disable-next-line no-alert
      if (process.env.NODE_ENV === 'development') console.debug('toast:', args);
    }
  }
  return { toast };
}


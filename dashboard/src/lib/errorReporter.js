const isDev = import.meta.env.DEV;
const endpoint = import.meta.env.VITE_ERROR_REPORT_URL ?? null;

export function reportError(error, context = {}) {
    if (isDev) {
        console.error('[ErrorReporter]', error, context);
        return;
    }

    if (!endpoint) return;

    const payload = {
        message: error?.message ?? String(error),
        stack: error?.stack ?? null,
        context,
        url: window.location.href,
        timestamp: new Date().toISOString(),
    };

    navigator.sendBeacon(endpoint, JSON.stringify(payload));
}

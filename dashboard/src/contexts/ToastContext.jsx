import { createContext, useCallback, useContext, useId, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

let _idCounter = 0;

const ICONS = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
};

const COLORS = {
    success: { border: '#22c55e', icon: '#22c55e' },
    error: { border: '#ef4444', icon: '#ef4444' },
    info: { border: 'hsl(var(--border))', icon: 'hsl(var(--primary))' },
};

function ToastItem({ toast, onRemove }) {
    const Icon = ICONS[toast.type] ?? Info;
    const colors = COLORS[toast.type] ?? COLORS.info;

    return (
        <div
            role="status"
            aria-live="polite"
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                borderRadius: '0.5rem',
                border: `1px solid ${colors.border}`,
                background: 'hsl(var(--card))',
                color: 'hsl(var(--foreground))',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                minWidth: '280px',
                maxWidth: '380px',
                animation: 'fade-in 0.2s ease-out',
            }}
        >
            <Icon size={18} style={{ color: colors.icon, flexShrink: 0, marginTop: '1px' }} aria-hidden="true" />
            <span style={{ flex: 1, fontSize: '0.875rem', lineHeight: '1.4' }}>{toast.message}</span>
            <button
                onClick={() => onRemove(toast.id)}
                aria-label="Dismiss notification"
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0',
                    color: 'hsl(var(--muted-foreground))',
                    flexShrink: 0,
                }}
            >
                <X size={16} aria-hidden="true" />
            </button>
        </div>
    );
}

function ToastContainer({ toasts, onRemove }) {
    if (toasts.length === 0) return null;

    return (
        <div
            aria-label="Notifications"
            style={{
                position: 'fixed',
                bottom: '1.5rem',
                right: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                zIndex: 9999,
            }}
        >
            {toasts.map((t) => (
                <ToastItem key={t.id} toast={t} onRemove={onRemove} />
            ))}
        </div>
    );
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3500) => {
        const id = ++_idCounter;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
    return ctx;
}

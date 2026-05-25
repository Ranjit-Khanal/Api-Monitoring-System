import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { reportError } from '../lib/errorReporter';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        reportError(error, { componentStack: info?.componentStack });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback(this.state.error, this.handleReset);
            }

            return (
                <div
                    role="alert"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        padding: '3rem',
                        textAlign: 'center',
                    }}
                >
                    <AlertTriangle size={48} style={{ color: 'hsl(var(--destructive))' }} aria-hidden="true" />
                    <h3 style={{ margin: 0 }}>Something went wrong</h3>
                    <p style={{ color: 'hsl(var(--muted-foreground))', margin: 0, fontSize: '0.875rem' }}>
                        {this.state.error?.message ?? 'An unexpected error occurred'}
                    </p>
                    <button
                        onClick={this.handleReset}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '0.375rem',
                            background: 'transparent',
                            color: 'hsl(var(--foreground))',
                            cursor: 'pointer',
                        }}
                    >
                        <RefreshCw size={16} aria-hidden="true" />
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

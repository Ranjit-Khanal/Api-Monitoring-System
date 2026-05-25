import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/api';
import { Activity, Lock, User, Loader2 } from 'lucide-react';
import styles from '../styles/modules/Login.module.scss';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            if (data.success) {
                // Server sets cookie `authToken`; don't persist token in localStorage
                onLoginSuccess();
            } else {
                setError(data.message);
            }
        },
        onError: (error) => {
            setError(error.response?.data?.message || 'Failed to connect to server');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        loginMutation.mutate({ username, password });
    };

    return (
        <div className={styles.container}>
            {/* Animated background elements */}
            <div className={styles.backgroundElements}>
                <div className={`${styles.backgroundOrb} ${styles.orb1}`}></div>
                <div className={`${styles.backgroundOrb} ${styles.orb2}`}></div>
                <div className={`${styles.backgroundOrb} ${styles.orb3}`}></div>
            </div>

            <div className={styles.loginCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.logoContainer}>
                        <Activity />
                    </div>
                    <h1 className={styles.title}>
                        API Monitor
                    </h1>
                    <p className={styles.description}>
                        Sign in to access your dashboard
                    </p>
                </div>
                <div className={styles.cardContent}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username" className={styles.label}>
                                Username
                            </label>
                            <div className={styles.inputContainer}>
                                <User />
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    disabled={loginMutation.isPending}
                                    className={styles.input}
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                            <div className={styles.inputContainer}>
                                <Lock />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loginMutation.isPending}
                                    className={styles.input}
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={loginMutation.isPending}
                        >
                            <div className={styles.buttonContent}>
                                {loginMutation.isPending ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

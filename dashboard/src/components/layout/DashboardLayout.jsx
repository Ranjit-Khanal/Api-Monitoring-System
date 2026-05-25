import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, X, LogOut, Clock, RefreshCw } from 'lucide-react';
import { useQueryClient, useIsFetching } from '@tanstack/react-query';
import { useTheme } from '../../contexts/ThemeContext';
import { useDashboardQuery } from '../../hooks/useDashboardQuery';
import { QUERY_KEYS } from '../../constants';
import styles from '../../styles/modules/layout/DashboardLayout.module.scss';

export function DashboardLayout({ children, onLogout }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { currentTheme } = useTheme();
    const queryClient = useQueryClient();
    const isFetching = useIsFetching({ queryKey: QUERY_KEYS.DASHBOARD }) > 0;
    const { dataUpdatedAt } = useDashboardQuery({ notifyOnChangeProps: ['dataUpdatedAt'] });

    const lastUpdated = dataUpdatedAt
        ? new Date(dataUpdatedAt).toLocaleTimeString()
        : '--';

    const handleRefresh = () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD });
    };

    const themeClass = currentTheme === 'purple' ? styles.themePurple : styles.themeLight;

    return (
        <div className={`${styles.container} ${themeClass}`}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className={styles.mainContent}>
                <header className={styles.header}>
                    <div className={styles.headerContent}>
                        <button
                            className={styles.mobileMenuButton}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
                        >
                            {sidebarOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                        </button>
                        <div className={styles.pageTitle}>
                            <p>
                                <Clock aria-hidden="true" />
                                Last updated: {lastUpdated}
                            </p>
                        </div>
                        <div className={styles.actionButtons}>
                            <button
                                className={styles.refreshButton}
                                onClick={handleRefresh}
                                disabled={isFetching}
                                aria-label="Refresh data"
                            >
                                <RefreshCw
                                    className={isFetching ? styles.spinning : ''}
                                    aria-hidden="true"
                                />
                                <span className={styles.hiddenText}>Refresh</span>
                            </button>
                            <button
                                className={styles.logoutButton}
                                onClick={onLogout}
                                aria-label="Log out"
                            >
                                <LogOut aria-hidden="true" />
                                <span className={styles.hiddenText}>Logout</span>
                            </button>
                        </div>
                    </div>
                </header>
                <main className={styles.pageContent}>
                    {children}
                </main>
            </div>
        </div>
    );
}

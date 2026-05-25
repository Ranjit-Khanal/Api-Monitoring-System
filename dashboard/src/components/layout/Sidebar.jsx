import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
    LayoutDashboard,
    Settings,
    Zap,
} from 'lucide-react';
import styles from '../../styles/modules/layout/Sidebar.module.scss';

const navItems = [
    {
        title: 'Overview',
        href: '/',
        icon: LayoutDashboard,
        description: 'Main dashboard view'
    },
];

const bottomNavItems = [
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
        description: 'App settings'
    },
];

export function Sidebar({ isOpen, onClose }) {
    return (
        <>
            {isOpen && (
                <div
                    className={styles.mobileOverlay}
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
            <aside
                className={cn(styles.sidebar, !isOpen && styles.closed)}
                aria-label="Sidebar"
                aria-expanded={isOpen}
            >
                <div className={styles.sidebarContainer}>
                    <div className={styles.logoSection}>
                        <div className={cn(styles.logoIcon, 'theme-logo-bg')}>
                            <Zap aria-hidden="true" />
                        </div>
                        <div className={styles.logoText}>
                            <h2 className="theme-text-gradient">API Monitor</h2>
                            <p>By Code Architecture</p>
                        </div>
                    </div>
                    <nav className={styles.navigation} aria-label="Main navigation">
                        <div className={styles.navList}>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.href}
                                        to={item.href}
                                        end={item.href === '/'}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            cn(styles.navLink, isActive && styles.active)
                                        }
                                    >
                                        <Icon aria-hidden="true" />
                                        <div className={styles.navItem}>
                                            <div>{item.title}</div>
                                        </div>
                                    </NavLink>
                                );
                            })}
                        </div>
                    </nav>
                    <div className={styles.bottomNavigation}>
                        {bottomNavItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.href}
                                    to={item.href}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        cn(styles.navLink, isActive && styles.active)
                                    }
                                >
                                    <Icon aria-hidden="true" />
                                    <div className={styles.navItem}>
                                        <div>{item.title}</div>
                                    </div>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </aside>
        </>
    );
}

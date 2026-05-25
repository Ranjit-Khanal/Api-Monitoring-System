import { useTheme } from '../contexts/ThemeContext';
import { Check, Palette, Moon, Sun } from 'lucide-react';
import styles from '../styles/modules/ThemeSelector.module.scss';

const THEME_ICONS = { light: Sun, purple: Moon };

export function ThemeSelector() {
    const { currentTheme, themes, switchTheme } = useTheme();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Palette aria-hidden="true" />
                <h3>Theme</h3>
            </div>

            <div className={styles.themeGrid}>
                {Object.entries(themes).map(([themeKey, theme]) => {
                    const isActive = currentTheme === themeKey;
                    const Icon = THEME_ICONS[themeKey] ?? Moon;

                    return (
                        <div
                            key={themeKey}
                            className={`${styles.themeCard} ${isActive ? styles.active : ''}`}
                            onClick={() => switchTheme(themeKey)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={isActive}
                            aria-label={`Switch to ${theme.name} theme`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    switchTheme(themeKey);
                                }
                            }}
                        >
                            <div className={styles.themeContent}>
                                <div className={styles.iconContainer}>
                                    <Icon aria-hidden="true" />
                                </div>
                                <div className={styles.themeInfo}>
                                    <div className={styles.themeHeader}>
                                        <h4>{theme.name}</h4>
                                        {isActive && <Check aria-hidden="true" />}
                                    </div>
                                    <p className={styles.themeDescription}>{theme.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

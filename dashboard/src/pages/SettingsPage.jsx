import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui';
import { ThemeSelector } from '../components/ThemeSelector';
import { Palette } from 'lucide-react';
import styles from '../styles/modules/pages/PageComponents.module.scss';

export function SettingsPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <h2>Settings</h2>
                <p>Manage your preferences</p>
            </div>

            <Card className={styles.sectionCard}>
                <CardHeader>
                    <div className={styles.cardTitleRow}>
                        <Palette className={styles.cardTitleIcon} aria-hidden="true" />
                        <CardTitle>Appearance</CardTitle>
                    </div>
                    <CardDescription>Customize the look and feel of your dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <ThemeSelector />
                </CardContent>
            </Card>
        </div>
    );
}

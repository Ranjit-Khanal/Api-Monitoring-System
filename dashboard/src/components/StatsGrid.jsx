import { Card, CardContent } from './ui';
import { TrendingUp, Clock, AlertTriangle, CheckCircle2, Layers, Zap } from 'lucide-react';
import styles from '../styles/modules/StatsGrid.module.scss';

function StatsGrid({ stats }) {
    const successRate = 100 - stats.errorRate;

    const statCards = [
        {
            title: 'Total Hits',
            value: stats.totalHits.toLocaleString(),
            subtitle: 'Last 24 hours',
            icon: TrendingUp,
            gradientClass: styles.gradientBlue,
            bgClass: styles.bgBlue,
            textClass: styles.textBlue,
            progressClass: styles.progressBlue,
        },
        {
            title: 'Average Latency',
            value: `${stats.avgLatency.toFixed(2)} ms`,
            subtitle: 'Response time',
            icon: Clock,
            gradientClass: styles.gradientPurple,
            bgClass: styles.bgPurple,
            textClass: styles.textPurple,
            progressClass: styles.progressPurple,
        },
        {
            title: 'Error Rate',
            value: `${stats.errorRate.toFixed(1)}%`,
            subtitle: `${stats.errorHits.toLocaleString()} errors`,
            icon: AlertTriangle,
            gradientClass: styles.gradientRed,
            bgClass: styles.bgRed,
            textClass: styles.textRed,
            progressClass: styles.progressRed,
        },
        {
            title: 'Success Rate',
            value: `${successRate.toFixed(1)}%`,
            subtitle: `${stats.successHits.toLocaleString()} success`,
            icon: CheckCircle2,
            gradientClass: styles.gradientGreen,
            bgClass: styles.bgGreen,
            textClass: styles.textGreen,
            progressClass: styles.progressGreen,
        },
        {
            title: 'Unique Services',
            value: stats.uniqueServices,
            subtitle: 'Active services',
            icon: Layers,
            gradientClass: styles.gradientIndigo,
            bgClass: styles.bgIndigo,
            textClass: styles.textIndigo,
            progressClass: styles.progressIndigo,
        },
        {
            title: 'Unique Endpoints',
            value: stats.uniqueEndpoints,
            subtitle: 'API endpoints',
            icon: Zap,
            gradientClass: styles.gradientYellow,
            bgClass: styles.bgYellow,
            textClass: styles.textYellow,
            progressClass: styles.progressYellow,
        },
    ];

    return (
        <div className={styles.container}>
            {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card
                        key={stat.title}
                        className={styles.statCard}
                        style={{ animationDelay: `${statCards.indexOf(stat) * 100}ms` }}
                    >
                        <CardContent className={styles.cardContent}>
                            <div className={styles.contentLayout}>
                                <div className={styles.textContent}>
                                    <p className={styles.title}>
                                        {stat.title}
                                    </p>
                                    <h3 className={`${styles.value} ${stat.gradientClass}`}>
                                        {stat.value}
                                    </h3>
                                    <p className={styles.subtitle}>
                                        {stat.subtitle}
                                    </p>
                                </div>
                                <div className={`${styles.iconContainer} ${stat.bgClass}`}>
                                    <Icon className={stat.textClass} />
                                </div>
                            </div>

                            <div className={`${styles.progressBar} ${stat.progressClass}`} />
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

export default StatsGrid;

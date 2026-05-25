import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui';
import { BarChart3, TrendingUp, Clock, AlertCircle, Activity } from 'lucide-react';
import styles from '../styles/modules/TopEndpoints.module.scss';

function TopEndpoints({ endpoints }) {
    const getMethodColor = (method) => {
        const colors = {
            GET: styles.methodGet,
            POST: styles.methodPost,
            PUT: styles.methodPut,
            DELETE: styles.methodDelete,
            PATCH: styles.methodPatch,
        };
        return colors[method] || styles.methodDefault;
    };

    const getRankColor = (index) => {
        if (index === 0) return styles.rank1;
        if (index === 1) return styles.rank2;
        if (index === 2) return styles.rank3;
        return styles.rankOther;
    };

    if (!endpoints || endpoints.length === 0) {
        return (
            <Card className={styles.container}>
                <CardHeader>
                    <div className={styles.headerInfo}>
                        <div className={styles.iconContainer}>
                            <BarChart3 className={styles.icon} />
                        </div>
                        <div>
                            <CardTitle>Top Endpoints</CardTitle>
                            <CardDescription>Most active API endpoints</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={styles.noDataContainer}>
                        <div className={styles.noDataIcon}>
                            <Activity className={styles.noDataIconSvg} />
                        </div>
                        <p className={styles.noDataText}>No data available yet</p>
                        <p className={styles.noDataSubtext}>
                            Endpoint statistics will appear here once traffic is recorded
                        </p>
                    </div>
                </CardContent>
            </Card >
        );
    }

    return (
        <Card className={styles.container}>
            <CardHeader>
                <div className={styles.headerContainer}>
                    <div className={styles.headerInfo}>
                        <div className={styles.iconContainer}>
                            <BarChart3 className={styles.icon} />
                        </div>
                        <div>
                            <CardTitle>Top Endpoints</CardTitle>
                            <CardDescription>Most active API endpoints by hit count</CardDescription>
                        </div>
                    </div>
                    <Badge variant="secondary" className={styles.badge}>
                        <TrendingUp className={styles.badgeIcon} />
                        Top {endpoints.length}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className={styles.endpointsList}>
                    {endpoints.map((endpoint, index) => (
                        <div
                            key={`${endpoint.endpoint}-${endpoint.method}`}
                            className={styles.endpointItem}
                        >
                            <div className={styles.endpointContent}>
                                <div className={`${styles.rankBadge} ${getRankColor(index)}`}>
                                    {index + 1}
                                </div>

                                {/* Endpoint Info */}
                                <div className={styles.endpointInfo}>
                                    <div className={styles.endpointHeader}>
                                        <code className={styles.endpointPath}>
                                            {endpoint.endpoint}
                                        </code>
                                        <div className={styles.badgeGroup}>
                                            <Badge variant="outline" className={`${styles.methodBadge} ${getMethodColor(endpoint.method)}`}>
                                                {endpoint.method}
                                            </Badge>
                                            <Badge variant="secondary" className={styles.badge}>
                                                <Activity className={styles.badgeIcon} />
                                                {endpoint.serviceName}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className={styles.statsGrid}>
                                        <div className={styles.statItem}>
                                            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
                                                <TrendingUp className={styles.statIconSvg} />
                                            </div>
                                            <div>
                                                <p className={styles.statLabel}>Hits</p>
                                                <p className={styles.statValue}>
                                                    {parseInt(endpoint.totalHits).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.statItem}>
                                            <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
                                                <Clock className={styles.statIconSvg} />
                                            </div>
                                            <div>
                                                <p className={styles.statLabel}>Avg Latency</p>
                                                <p className={styles.statValue}>{endpoint.avgLatency} ms</p>
                                            </div>
                                        </div>
                                        <div className={styles.statItem}>
                                            <div className={`${styles.statIcon} ${styles.statIconRed}`}>
                                                <AlertCircle className={styles.statIconSvg} />
                                            </div>
                                            <div>
                                                <p className={styles.statLabel}>Error Rate</p>
                                                <p className={`${styles.statValue} ${styles.errorRate}`}>{endpoint.errorRate}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default TopEndpoints;

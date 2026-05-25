import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui';
import { useChartTheme } from '../../hooks/useChartTheme';
import styles from '../../styles/modules/charts/Charts.module.scss';

export function StatusDistributionChart({ data }) {
    const chart = useChartTheme();

    const options = useMemo(() => ({
        chart: { type: 'donut', background: 'transparent' },
        theme: { mode: chart.mode },
        labels: data?.labels ?? ['Success', 'Client Error', 'Server Error'],
        colors: ['#10b981', '#f59e0b', '#ef4444'],
        dataLabels: {
            enabled: true,
            style: { fontSize: '14px', fontWeight: 'bold' },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: { show: true, fontSize: '18px', color: chart.labelColor },
                        value: {
                            show: true,
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: chart.labelColor,
                            formatter: (val) => Number(val).toLocaleString(),
                        },
                        total: {
                            show: true,
                            label: 'Total Requests',
                            fontSize: '14px',
                            color: chart.labelColor,
                            formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0).toLocaleString(),
                        },
                    },
                },
            },
        },
        legend: { position: 'bottom', labels: { colors: chart.labelColor } },
        tooltip: {
            theme: chart.tooltipTheme,
            y: { formatter: (v) => `${Number(v).toLocaleString()} requests` },
        },
    }), [data?.labels, chart.mode, chart.labelColor, chart.tooltipTheme]);

    const series = useMemo(() => data?.values ?? [], [data?.values]);

    const isEmpty = !series.length || series.every((v) => v === 0);

    return (
        <Card className={styles.chartCard}>
            <CardHeader>
                <CardTitle>Status Code Distribution</CardTitle>
                <CardDescription>HTTP status code breakdown</CardDescription>
            </CardHeader>
            <CardContent>
                {isEmpty ? (
                    <div className={styles.emptyChart}>
                        <p>No request data available yet</p>
                        <span>Data will appear once API requests are ingested</span>
                    </div>
                ) : (
                    <Chart options={options} series={series} type="donut" height={350} />
                )}
            </CardContent>
        </Card>
    );
}

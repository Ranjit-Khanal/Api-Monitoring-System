import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui';
import { useChartTheme } from '../../hooks/useChartTheme';
import styles from '../../styles/modules/charts/Charts.module.scss';

export function LatencyChart({ data }) {
    const chart = useChartTheme();

    const options = useMemo(() => ({
        chart: {
            type: 'line',
            toolbar: { show: false },
            background: 'transparent',
        },
        theme: { mode: chart.mode },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        grid: { borderColor: chart.gridColor, strokeDashArray: 4 },
        xaxis: {
            categories: data?.categories ?? [],
            labels: { style: { colors: chart.labelColor } },
        },
        yaxis: {
            labels: {
                style: { colors: chart.labelColor },
                formatter: (v) => `${v.toFixed(0)}ms`,
            },
        },
        colors: ['#f59e0b', '#10b981'],
        tooltip: {
            theme: chart.tooltipTheme,
            y: { formatter: (v) => `${v.toFixed(2)}ms` },
        },
        legend: { labels: { colors: chart.labelColor } },
        markers: {
            size: 4,
            colors: ['#f59e0b', '#10b981'],
            strokeWidth: 2,
            strokeColors: chart.strokeColor,
            hover: { size: 6 },
        },
    }), [data?.categories, chart.mode, chart.labelColor, chart.gridColor, chart.tooltipTheme, chart.strokeColor]);

    const series = useMemo(() => [
        { name: 'Avg Latency', data: data?.avgLatency ?? [] },
        { name: 'P95 Latency', data: data?.p95Latency ?? [] },
    ], [data?.avgLatency, data?.p95Latency]);

    return (
        <Card className={styles.chartCard}>
            <CardHeader>
                <CardTitle>Response Time Analysis</CardTitle>
                <CardDescription>Average and P95 latency metrics</CardDescription>
            </CardHeader>
            <CardContent>
                <Chart options={options} series={series} type="line" height={350} />
            </CardContent>
        </Card>
    );
}

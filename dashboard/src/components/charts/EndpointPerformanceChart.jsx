import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui';
import { useChartTheme } from '../../hooks/useChartTheme';
import styles from '../../styles/modules/charts/Charts.module.scss';

export function EndpointPerformanceChart({ data }) {
    const chart = useChartTheme();

    const options = useMemo(() => ({
        chart: {
            type: 'bar',
            toolbar: { show: false },
            background: 'transparent',
        },
        theme: { mode: chart.mode },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 8,
                dataLabels: { position: 'top' },
            },
        },
        dataLabels: {
            enabled: true,
            offsetX: 30,
            style: { fontSize: '12px', colors: [chart.labelColor] },
            formatter: (v) => Number(v).toLocaleString(),
        },
        grid: { borderColor: chart.gridColor, strokeDashArray: 4 },
        xaxis: {
            categories: data?.endpoints ?? [],
            labels: { style: { colors: chart.labelColor } },
        },
        yaxis: {
            labels: { style: { colors: chart.labelColor } },
        },
        colors: ['#8b5cf6'],
        tooltip: { theme: chart.tooltipTheme },
    }), [data?.endpoints, chart.mode, chart.labelColor, chart.gridColor, chart.tooltipTheme]);

    const series = useMemo(() => [
        { name: 'Total Hits', data: data?.hits ?? [] },
    ], [data?.hits]);

    return (
        <Card className={styles.chartCard}>
            <CardHeader>
                <CardTitle>Top Endpoints by Volume</CardTitle>
                <CardDescription>Most requested API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
                <Chart options={options} series={series} type="bar" height={350} />
            </CardContent>
        </Card>
    );
}

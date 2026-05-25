import { useTheme } from '../contexts/ThemeContext';

export function useChartTheme() {
    const { currentTheme } = useTheme();
    const isLight = currentTheme === 'light';

    return {
        mode: isLight ? 'light' : 'dark',
        labelColor: isLight ? '#64748b' : '#94a3b8',
        gridColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
        tooltipTheme: isLight ? 'light' : 'dark',
        strokeColor: isLight ? '#1e293b' : '#0f172a',
    };
}

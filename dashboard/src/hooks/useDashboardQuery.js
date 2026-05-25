import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/api';
import { QUERY_KEYS, REFETCH_INTERVAL } from '../constants';

export function useDashboardQuery(options = {}) {
    return useQuery({
        queryKey: QUERY_KEYS.DASHBOARD,
        queryFn: analyticsApi.getDashboard,
        refetchInterval: REFETCH_INTERVAL,
        ...options,
    });
}

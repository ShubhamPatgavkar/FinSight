import { useState, useEffect } from 'react';
import axios from 'axios';
import { ChartData, CategoryData, SummaryMetrics } from '../types';

interface DashboardData {
  summary: SummaryMetrics;
  chartData: ChartData[];
  categoryData: CategoryData[];
}

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/dashboard/summary');
        setDashboardData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { dashboardData, loading, error };
};
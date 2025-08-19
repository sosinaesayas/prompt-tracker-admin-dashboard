import { apiService } from '../../../services/api';
import type { AnalyticsStats } from '../types';

export class AnalyticsService {
  async getStats(): Promise<AnalyticsStats | null> {
    const response = await apiService.get<AnalyticsStats>('/prompts/stats');
    return response.data || null;
  }

  async getChartData(): Promise<any> {
    const response = await apiService.get('/analytics/chart-data');
    return response.data || null;
  }

  async getTrends(): Promise<any> {
    const response = await apiService.get('/analytics/trends');
    return response.data || null;
  }
}

export const analyticsService = new AnalyticsService(); 
import { useState, useEffect } from 'react';
import { promptsService } from '../services/prompts.service';
import type { PromptStats } from '../types';

export const usePromptStats = () => {
  const [stats, setStats] = useState<PromptStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await promptsService.getPromptStats();
      setStats(result);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}; 
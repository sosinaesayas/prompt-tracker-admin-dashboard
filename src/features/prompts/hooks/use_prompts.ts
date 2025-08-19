import { useState, useEffect, useCallback } from 'react';
import { promptsService } from '../services/prompts.service';
import type { Prompt, PromptFilters, PromptSorting, PromptPagination } from '../types';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<PromptFilters>({
    searchTerm: '',
    employeeFilter: 'all',
    dateRange: { start: '', end: '' },
    toolFilter: 'all',
    severityFilter: 'all',
    clientFilter: 'all',
    flaggedOnly: false,
  });

  const [sorting, setSorting] = useState<PromptSorting>({
    field: 'timestamp',
    direction: 'desc',
  });

  const [pagination, setPagination] = useState<PromptPagination>({
    currentPage: 1,
    itemsPerPage: 25,
  });

  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await promptsService.getPrompts(pagination, sorting, filters);
      setPrompts(result.prompts);
      setTotal(result.total);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch prompts');
    } finally {
      setLoading(false);
    }
  }, [pagination, sorting, filters]);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  const updateFilters = useCallback((newFilters: Partial<PromptFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  const updateSorting = useCallback((newSorting: PromptSorting) => {
    setSorting(newSorting);
  }, []);

  const updatePagination = useCallback((newPagination: Partial<PromptPagination>) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  }, []);

  return {
    prompts,
    loading,
    error,
    total,
    filters,
    sorting,
    pagination,
    updateFilters,
    updateSorting,
    updatePagination,
    refetch: fetchPrompts,
  };
}; 
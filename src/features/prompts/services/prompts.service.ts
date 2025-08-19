import { apiService } from '../../../services/api';
import type { Prompt, PromptStats, PromptFilters, PromptSorting, PromptPagination } from '../types';

export class PromptsService {
  async getPrompts(
    pagination: PromptPagination,
    sorting: PromptSorting,
    filters: PromptFilters
  ): Promise<{ prompts: Prompt[]; total: number }> {
    const params = new URLSearchParams({
      page: pagination.currentPage.toString(),
      limit: pagination.itemsPerPage.toString(),
      sortBy: sorting.field,
      sortOrder: sorting.direction,
      ...(filters.searchTerm && { search: filters.searchTerm }),
      ...(filters.employeeFilter !== 'all' && { employee: filters.employeeFilter }),
      ...(filters.dateRange.start && { startDate: filters.dateRange.start }),
      ...(filters.dateRange.end && { endDate: filters.dateRange.end }),
      ...(filters.toolFilter !== 'all' && { tool: filters.toolFilter }),
      ...(filters.severityFilter !== 'all' && { severity: filters.severityFilter }),
      ...(filters.clientFilter !== 'all' && { client: filters.clientFilter }),
      ...(filters.flaggedOnly && { flagged: 'true' }),
    });

    const response = await apiService.get<{ prompts: Prompt[]; total: number }>(`/prompts?${params}`);
    return response.data || { prompts: [], total: 0 };
  }

  async getPromptStats(): Promise<PromptStats | null> {
    const response = await apiService.get<PromptStats>('/prompts/stats');
    return response.data || null;
  }

  async getPromptById(id: string): Promise<Prompt | null> {
    const response = await apiService.get<Prompt>(`/prompts/${id}`);
    return response.data || null;
  }

  async updatePrompt(id: string, updates: Partial<Prompt>): Promise<Prompt | null> {
    const response = await apiService.patch<Prompt>(`/prompts/${id}`, updates);
    return response.data || null;
  }

  async deletePrompt(id: string): Promise<boolean> {
    const response = await apiService.delete<null>(`/prompts/${id}`);
    return response.success;
  }

  async exportPrompts(filters: PromptFilters): Promise<Blob> {
    const params = new URLSearchParams({
      ...(filters.searchTerm && { search: filters.searchTerm }),
      ...(filters.employeeFilter !== 'all' && { employee: filters.employeeFilter }),
      ...(filters.dateRange.start && { startDate: filters.dateRange.start }),
      ...(filters.dateRange.end && { endDate: filters.dateRange.end }),
      ...(filters.toolFilter !== 'all' && { tool: filters.toolFilter }),
      ...(filters.severityFilter !== 'all' && { severity: filters.severityFilter }),
      ...(filters.clientFilter !== 'all' && { client: filters.clientFilter }),
      ...(filters.flaggedOnly && { flagged: 'true' }),
    });

    const response = await fetch(`${apiService['api'].defaults.baseURL}/prompts/export?${params}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.blob();
  }
}

export const promptsService = new PromptsService(); 
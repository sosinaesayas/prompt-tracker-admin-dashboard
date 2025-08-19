import React, { useState } from 'react';
import { usePrompts } from '../hooks/use_prompts';
import { usePromptStats } from '../hooks/use_prompt_stats';
import { PromptFilters } from './prompt_filters';
import { PromptStats } from './prompt_stats';
import { PromptTable } from './prompt_table';
import { PromptDetails } from './prompt_details';
import { Pagination } from '../../../components/common/pagination';
import { Loading } from '../../../components/common/loading';
import { DashboardLayout } from '../../../layouts/dashboard_layout';
import { promptsService } from '../services/prompts.service';
import type { Prompt } from '../types';

export const PromptsPage: React.FC = () => {
  const {
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
  } = usePrompts();

  const { stats, loading: statsLoading } = usePromptStats();
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSort = (field: string) => {
    const newDirection = sorting.field === field && sorting.direction === 'asc' ? 'desc' : 'asc';
    updateSorting({ field, direction: newDirection });
  };

  const handlePageChange = (page: number) => {
    updatePagination({ currentPage: page });
  };

  const handleViewDetails = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedPrompt(null);
  };

  const handleExport = async () => {
    try {
      const blob = await promptsService.exportPrompts(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prompts-export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (loading || statsLoading) {
    return (
      <DashboardLayout>
        <Loading size="lg" className="min-h-screen" />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Prompts</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalPages = Math.ceil(total / pagination.itemsPerPage);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Prompts Management</h1>
        </div>

        {stats && <PromptStats stats={stats} />}

        <PromptFilters
          filters={filters}
          onFiltersChange={updateFilters}
        />

        <PromptTable
          prompts={prompts}
          sorting={sorting}
          onSort={handleSort}
          onViewDetails={handleViewDetails}
          onExport={handleExport}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-6"
          />
        )}

        <PromptDetails
          prompt={selectedPrompt}
          isOpen={showDetails}
          onClose={handleCloseDetails}
        />
      </div>
    </DashboardLayout>
  );
}; 
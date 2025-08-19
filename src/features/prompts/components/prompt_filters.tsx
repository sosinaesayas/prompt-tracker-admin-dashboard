import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../../components/common/input';
import type { PromptFilters as PromptFiltersType } from '../types';

interface PromptFiltersProps {
  filters: PromptFiltersType;
  onFiltersChange: (filters: Partial<PromptFiltersType>) => void;
}

export const PromptFilters: React.FC<PromptFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleChange = (field: keyof PromptFiltersType) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onFiltersChange({ [field]: e.target.value });
  };

  const handleDateChange = (field: 'start' | 'end') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFiltersChange({
      dateRange: { ...filters.dateRange, [field]: e.target.value }
    });
  };

  const handleFlaggedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ flaggedOnly: e.target.checked });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-4 mb-4">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search prompts..."
          value={filters.searchTerm}
          onChange={handleChange('searchTerm')}
          className="flex-1"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select
          value={filters.employeeFilter}
          onChange={handleChange('employeeFilter')}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        >
          <option value="all">All Employees</option>
          <option value="john">John Doe</option>
          <option value="jane">Jane Smith</option>
        </select>

        <select
          value={filters.toolFilter}
          onChange={handleChange('toolFilter')}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        >
          <option value="all">All AI Tools</option>
          <option value="chatgpt">ChatGPT</option>
          <option value="claude">Claude</option>
        </select>

        <select
          value={filters.severityFilter}
          onChange={handleChange('severityFilter')}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        >
          <option value="all">All Severities</option>
          <option value="high">High Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="low">Low Risk</option>
        </select>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={filters.flaggedOnly}
            onChange={handleFlaggedChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 text-sm text-gray-700">Flagged Only</label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input
          type="date"
          label="Start Date"
          value={filters.dateRange.start}
          onChange={handleDateChange('start')}
        />
        <Input
          type="date"
          label="End Date"
          value={filters.dateRange.end}
          onChange={handleDateChange('end')}
        />
      </div>
    </div>
  );
}; 
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../../components/common/input';
import type { ClientFilters as ClientFiltersType } from '../types';

interface ClientFiltersProps {
  filters: ClientFiltersType;
  onFiltersChange: (filters: Partial<ClientFiltersType>) => void;
}

export const ClientFilters: React.FC<ClientFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleChange = (field: keyof ClientFiltersType) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onFiltersChange({ [field]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-4 mb-4">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search clients..."
          value={filters.searchTerm}
          onChange={handleChange('searchTerm')}
          className="flex-1"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={filters.statusFilter}
          onChange={handleChange('statusFilter')}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}; 
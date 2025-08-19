import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../../components/common/input';
import type { UserFilters as UserFiltersType, Client } from '../types';

interface UserFiltersProps {
  filters: UserFiltersType;
  clients: Client[];
  onFiltersChange: (filters: Partial<UserFiltersType>) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  clients,
  onFiltersChange,
}) => {
  const handleChange = (field: keyof UserFiltersType) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onFiltersChange({ [field]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-4 mb-4">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search users..."
          value={filters.searchTerm}
          onChange={handleChange('searchTerm')}
          className="flex-1"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={filters.roleFilter}
          onChange={handleChange('roleFilter')}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="readonly">Read Only</option>
        </select>

        <select
          value={filters.clientFilter}
          onChange={handleChange('clientFilter')}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
        >
          <option value="all">All Clients</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}; 
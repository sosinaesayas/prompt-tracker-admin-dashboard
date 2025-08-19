import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../hooks/use_clients';
import { ClientFilters } from './client_filters';
import { ClientTable } from './client_table';
import { ClientForm } from './client_form';
import { Loading } from '../../../components/common/loading';
import { DashboardLayout } from '../../../layouts/dashboard_layout';
import { Building2, Users, TrendingUp, Plus } from 'lucide-react';
import type { Client, ClientFormData } from '../types';

export const ClientsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    clients,
    loading,
    error,
    filters,
    createClient,
    updateClient,
    deleteClient,
    updateFilters,
  } = useClients();

  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleAdd = () => {
    setEditingClient(null);
    setShowForm(true);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleView = (client: Client) => {
    navigate(`/clients/${client._id}`);
  };

  const handleDelete = async (clientId: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      await deleteClient(clientId);
    }
  };

  const handleSubmit = async (clientData: ClientFormData): Promise<boolean> => {
    if (editingClient) {
      return await updateClient(editingClient._id, clientData);
    } else {
      return await createClient(clientData);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingClient(null);
  };

  if (loading) {
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Clients</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const activeClients = clients.filter(client => client.isActive).length;
  const totalAgents = clients.length; // Using client count as agent count for now

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600">Manage your multi-tenant clients and their settings</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Client</span>
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold">{clients.length}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Building2 className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="bg-green-600 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Clients</p>
                <p className="text-3xl font-bold">{activeClients}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Users className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="bg-purple-600 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Agents</p>
                <p className="text-3xl font-bold">156</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Client List / Empty State */}
        {clients.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-600 mb-6">Create your first client to get started</p>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add First Client</span>
            </button>
          </div>
        ) : (
          <>
            <ClientFilters
              filters={filters}
              onFiltersChange={updateFilters}
            />

            <ClientTable
              clients={clients}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              onAdd={handleAdd}
            />
          </>
        )}

        <ClientForm
          isOpen={showForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          client={editingClient}
        />
      </div>
    </DashboardLayout>
  );
}; 
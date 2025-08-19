export interface Client {
  _id: string;
  name: string;
  clientId: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ClientFormData {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ClientFilters {
  searchTerm: string;
  statusFilter: string;
} 
export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  isActive: boolean;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  dueDate: string;
  paidDate?: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  createdAt: string;
}

export interface BillingStats {
  totalRevenue: number;
  monthlyRevenue: number;
  outstandingInvoices: number;
  overdueAmount: number;
  activeSubscriptions: number;
}

export interface PaymentFormData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export interface BillingFilters {
  searchTerm: string;
  statusFilter: string;
  dateRange: { start: string; end: string };
} 
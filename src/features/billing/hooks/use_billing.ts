import { useState, useEffect, useCallback } from 'react';
import { billingService } from '../services/billing.service';
import type { PaymentMethod, Invoice, BillingStats, PaymentFormData, BillingFilters } from '../types';

export const useBilling = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<BillingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<BillingFilters>({
    searchTerm: '',
    statusFilter: 'all',
    dateRange: { start: '', end: '' },
  });

  const fetchBillingData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [paymentData, invoicesData, statsData] = await Promise.all([
        billingService.getPaymentMethods(),
        billingService.getInvoices(),
        billingService.getBillingStats(),
      ]);
      setPaymentMethods(paymentData);
      setInvoices(invoicesData);
      setStats(statsData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch billing data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBillingData();
  }, [fetchBillingData]);

  const createPaymentMethod = async (paymentData: PaymentFormData): Promise<boolean> => {
    try {
      const newPayment = await billingService.createPaymentMethod(paymentData);
      if (newPayment) {
        setPaymentMethods(prev => [...prev, newPayment]);
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to create payment method');
      return false;
    }
  };

  const updatePaymentMethod = async (id: string, paymentData: Partial<PaymentFormData>): Promise<boolean> => {
    try {
      const updatedPayment = await billingService.updatePaymentMethod(id, paymentData);
      if (updatedPayment) {
        setPaymentMethods(prev => prev.map(payment => payment.id === id ? updatedPayment : payment));
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to update payment method');
      return false;
    }
  };

  const deletePaymentMethod = async (id: string): Promise<boolean> => {
    try {
      const success = await billingService.deletePaymentMethod(id);
      if (success) {
        setPaymentMethods(prev => prev.filter(payment => payment.id !== id));
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to delete payment method');
      return false;
    }
  };

  const updateFilters = useCallback((newFilters: Partial<BillingFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         invoice.clientName.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesStatus = filters.statusFilter === 'all' || invoice.status === filters.statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return {
    paymentMethods,
    invoices: filteredInvoices,
    stats,
    loading,
    error,
    filters,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    updateFilters,
    refetch: fetchBillingData,
  };
}; 
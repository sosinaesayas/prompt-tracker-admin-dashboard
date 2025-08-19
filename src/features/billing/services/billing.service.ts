import { apiService } from '../../../services/api';
import type { PaymentMethod, Invoice, BillingStats, PaymentFormData } from '../types';

export class BillingService {
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    // Mock data for now since backend endpoints don't exist yet
    return [
      {
        id: '1',
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
        isActive: true,
      },
      {
        id: '2',
        type: 'card',
        last4: '5555',
        brand: 'Mastercard',
        expiryMonth: 8,
        expiryYear: 2026,
        isDefault: false,
        isActive: true,
      },
    ];
  }

  async getInvoices(): Promise<Invoice[]> {
    // Mock data for now since backend endpoints don't exist yet
    return [
      {
        id: '1',
        number: 'INV-2024-001',
        clientId: '1',
        clientName: 'Acme Corp',
        amount: 2500.00,
        status: 'paid',
        dueDate: '2024-01-15',
        paidDate: '2024-01-10',
        items: [
          {
            description: 'AI Security Monitoring',
            quantity: 1,
            unitPrice: 2500.00,
            total: 2500.00,
          },
        ],
        createdAt: '2024-01-01',
      },
      {
        id: '2',
        number: 'INV-2024-002',
        clientId: '2',
        clientName: 'TechStart Inc',
        amount: 1500.00,
        status: 'pending',
        dueDate: '2024-02-15',
        items: [
          {
            description: 'AI Security Monitoring',
            quantity: 1,
            unitPrice: 1500.00,
            total: 1500.00,
          },
        ],
        createdAt: '2024-02-01',
      },
    ];
  }

  async getBillingStats(): Promise<BillingStats | null> {
    // Mock data for now since backend endpoints don't exist yet
    return {
      totalRevenue: 45000.00,
      monthlyRevenue: 8500.00,
      outstandingInvoices: 3,
      overdueAmount: 2500.00,
      activeSubscriptions: 12,
    };
  }

  async createPaymentMethod(paymentData: PaymentFormData): Promise<PaymentMethod | null> {
    // Mock implementation
    const newPayment: PaymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      last4: paymentData.cardNumber.slice(-4),
      brand: 'Visa', // Mock brand detection
      expiryMonth: parseInt(paymentData.expiryMonth),
      expiryYear: parseInt(paymentData.expiryYear),
      isDefault: false,
      isActive: true,
    };
    return newPayment;
  }

  async updatePaymentMethod(id: string, paymentData: Partial<PaymentFormData>): Promise<PaymentMethod | null> {
    // Mock implementation
    const existingPayment: PaymentMethod = {
      id,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
      isActive: true,
    };
    return existingPayment;
  }

  async deletePaymentMethod(id: string): Promise<boolean> {
    // Mock implementation
    return true;
  }

  async downloadInvoice(id: string): Promise<Blob> {
    // Mock implementation - return empty blob
    return new Blob(['Mock invoice content'], { type: 'application/pdf' });
  }
}

export const billingService = new BillingService(); 
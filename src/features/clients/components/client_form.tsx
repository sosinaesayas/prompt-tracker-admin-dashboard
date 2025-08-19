import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/common/modal';
import { Input } from '../../../components/common/input';
import { Button } from '../../../components/common/button';
import type { Client, ClientFormData } from '../types';

interface ClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientData: ClientFormData) => Promise<boolean>;
  client?: Client | null;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  client,
}) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        description: client.description || '',
        contactEmail: client.contactEmail || '',
        contactPhone: client.contactPhone || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        contactEmail: '',
        contactPhone: '',
      });
    }
  }, [client]);

  const handleChange = (field: keyof ClientFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await onSubmit(formData);
      if (success) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={client ? 'Edit Client' : 'Add Client'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Client Name"
          value={formData.name}
          onChange={handleChange('name')}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={handleChange('description')}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>

        <Input
          label="Contact Email"
          type="email"
          value={formData.contactEmail}
          onChange={handleChange('contactEmail')}
        />

        <Input
          label="Contact Phone"
          type="tel"
          value={formData.contactPhone}
          onChange={handleChange('contactPhone')}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            {client ? 'Update' : 'Create'} Client
          </Button>
        </div>
      </form>
    </Modal>
  );
}; 
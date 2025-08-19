import React from 'react';
import { Modal } from '../../../components/common/modal';
import type { Prompt } from '../types';

interface PromptDetailsProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PromptDetails: React.FC<PromptDetailsProps> = ({
  prompt,
  isOpen,
  onClose,
}) => {
  if (!prompt) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Prompt Details"
      size="xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Employee</h4>
            <p className="text-sm text-gray-900">{prompt.employeeName}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">AI Tool</h4>
            <p className="text-sm text-gray-900">{prompt.aiTool}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Timestamp</h4>
            <p className="text-sm text-gray-900">
              {new Date(prompt.timestamp).toLocaleString()}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Severity</h4>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(prompt.flagSeverity)}`}>
              {prompt.flagSeverity}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Prompt Text</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-900 whitespace-pre-wrap">{prompt.promptText}</p>
          </div>
        </div>

        {prompt.response && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Response</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{prompt.response}</p>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Metadata</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Device ID:</span>
                <span className="ml-2 text-gray-900">{prompt.deviceId}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Session ID:</span>
                <span className="ml-2 text-gray-900">{prompt.metadata.sessionId}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">IP Address:</span>
                <span className="ml-2 text-gray-900">{prompt.metadata.ipAddress}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Request ID:</span>
                <span className="ml-2 text-gray-900">{prompt.metadata.requestId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}; 
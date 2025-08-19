export interface Prompt {
  id: string;
  promptText: string;
  timestamp: string;
  aiTool: string;
  employeeId: string;
  employeeName: string;
  deviceId: string;
  clientId: string;
  clientName: string;
  flagSeverity: 'low' | 'medium' | 'high' | 'none';
  isFlagged: boolean;
  metadata: {
    userAgent: string;
    ipAddress: string;
    sessionId: string;
    requestId: string;
  };
  response?: string;
  responseTime?: number;
}

export interface PromptStats {
  totalPrompts: number;
  flaggedPrompts: number;
  highRiskPrompts: number;
  mediumRiskPrompts: number;
  lowRiskPrompts: number;
  topAiTools: Array<{ name: string; count: number; percentage: number }>;
  topEmployees: Array<{ name: string; prompts: number; flagged: number }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    severity: string;
  }>;
}

export interface PromptFilters {
  searchTerm: string;
  employeeFilter: string;
  dateRange: { start: string; end: string };
  toolFilter: string;
  severityFilter: string;
  clientFilter: string;
  flaggedOnly: boolean;
}

export interface PromptSorting {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PromptPagination {
  currentPage: number;
  itemsPerPage: number;
} 
export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Prompt {
  id: number;
  prompt: string;
  source: string;
  aiPlatform?: string;
  deviceId?: string;
  metadata?: any;
  isArchived: boolean;
  tags?: string[];
  timestamp: string;
  riskLevel?: 'high' | 'medium' | 'low';
  policyAnalysis?: any;
  confidence?: number;
  reasoning?: string;
  categories?: string[];
}

export interface Client {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  clientId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  skip: number;
} 
import { apiService } from './api';
import type { AuthUser, LoginCredentials, RegisterData, ApiResponse } from '../types';

export interface LoginResponse {
  user: AuthUser;
  access_token: string;
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    return apiService.post<LoginResponse>('/auth/login', credentials);
  }

  async register(data: RegisterData): Promise<ApiResponse<AuthUser>> {
    return apiService.post<AuthUser>('/auth/register', data);
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<{ accessToken: string; expiresIn: number }>> {
    return apiService.post('/auth/refresh', { refreshToken });
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  setTokens(accessToken: string, refreshToken?: string): void {
    try {
      localStorage.setItem('token', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    } catch (error) {
      console.error('Error setting tokens:', error);
    }
  }

  getToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem('refreshToken');
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  setUser(user: AuthUser): void {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error setting user:', error);
    }
  }

  getUser(): AuthUser | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    try {
      return !!this.getToken();
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }
}

export const authService = new AuthService(); 
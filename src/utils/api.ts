import type { ApiResponse } from '../types';

export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const isApiResponse = <T>(response: any): response is ApiResponse<T> => {
  return response && typeof response === 'object' && 'success' in response;
};

export const extractApiData = <T>(response: ApiResponse<T>): T | null => {
  return response.success ? response.data || null : null;
}; 
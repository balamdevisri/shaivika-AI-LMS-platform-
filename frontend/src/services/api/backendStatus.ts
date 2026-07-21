import { apiClient } from './axios';

export interface BackendStatusResponse {
  message: string;
  status?: string;
  timestamp?: string;
}

/**
 * Calls the backend GET / endpoint using Axios
 * @returns Promise<BackendStatusResponse>
 */
export const fetchBackendStatus = async (): Promise<BackendStatusResponse> => {
  const response = await apiClient.get<BackendStatusResponse>('/');
  return response.data;
};

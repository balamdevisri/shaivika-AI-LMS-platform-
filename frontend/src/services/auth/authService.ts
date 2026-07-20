import { apiClient } from '../api/axios';

export class AuthService {
  static async login(credentials: any) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  }
}

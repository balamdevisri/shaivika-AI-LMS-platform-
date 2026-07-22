export type UserRole = 'student' | 'instructor' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string | null;
  role: UserRole;
  createdAt: string;
  lastLogin: string;
  isVerified: boolean;
  providerId?: string;
  githubUsername?: string;
}

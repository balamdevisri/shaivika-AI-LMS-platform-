import { AdminRepository } from './admin.repository';

export class AdminService {
  private adminRepository: AdminRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
  }

  // Define business logic here
}

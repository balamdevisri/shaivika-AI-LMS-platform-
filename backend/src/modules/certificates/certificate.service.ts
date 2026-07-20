import { CertificateRepository } from './certificate.repository';

export class CertificateService {
  private certificateRepository: CertificateRepository;

  constructor() {
    this.certificateRepository = new CertificateRepository();
  }

  // Define business logic here
}

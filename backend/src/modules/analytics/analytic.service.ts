import { AnalyticRepository } from './analytic.repository';

export class AnalyticService {
  private analyticRepository: AnalyticRepository;

  constructor() {
    this.analyticRepository = new AnalyticRepository();
  }

  // Define business logic here
}

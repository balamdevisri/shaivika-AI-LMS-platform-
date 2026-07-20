import { AssignmentRepository } from './assignment.repository';

export class AssignmentService {
  private assignmentRepository: AssignmentRepository;

  constructor() {
    this.assignmentRepository = new AssignmentRepository();
  }

  // Define business logic here
}

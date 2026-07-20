import { StudentRepository } from './student.repository';

export class StudentService {
  private studentRepository: StudentRepository;

  constructor() {
    this.studentRepository = new StudentRepository();
  }

  // Define business logic here
}

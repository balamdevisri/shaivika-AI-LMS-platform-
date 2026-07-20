import { CourseRepository } from './course.repository';

export class CourseService {
  private courseRepository: CourseRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
  }

  // Define business logic here
}

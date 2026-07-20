import { LessonRepository } from './lesson.repository';

export class LessonService {
  private lessonRepository: LessonRepository;

  constructor() {
    this.lessonRepository = new LessonRepository();
  }

  // Define business logic here
}

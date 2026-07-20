import { QuizRepository } from './quiz.repository';

export class QuizService {
  private quizRepository: QuizRepository;

  constructor() {
    this.quizRepository = new QuizRepository();
  }

  // Define business logic here
}

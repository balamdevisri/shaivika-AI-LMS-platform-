import { Router } from 'express';
import { QuizController } from './quiz.controller';

const router = Router();
const controller = new QuizController();

// Define routes here

export default router;

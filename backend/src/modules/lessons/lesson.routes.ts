import { Router } from 'express';
import { LessonController } from './lesson.controller';

const router = Router();
const controller = new LessonController();

// Define routes here

export default router;

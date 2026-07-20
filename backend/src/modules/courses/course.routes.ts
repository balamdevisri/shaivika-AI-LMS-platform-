import { Router } from 'express';
import { CourseController } from './course.controller';

const router = Router();
const controller = new CourseController();

// Define routes here

export default router;

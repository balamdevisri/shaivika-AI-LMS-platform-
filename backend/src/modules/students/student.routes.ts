import { Router } from 'express';
import { StudentController } from './student.controller';

const router = Router();
const controller = new StudentController();

// Define routes here

export default router;

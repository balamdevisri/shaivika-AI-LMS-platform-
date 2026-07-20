import { Router } from 'express';
import { AssignmentController } from './assignment.controller';

const router = Router();
const controller = new AssignmentController();

// Define routes here

export default router;

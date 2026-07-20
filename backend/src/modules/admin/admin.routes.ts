import { Router } from 'express';
import { AdminController } from './admin.controller';

const router = Router();
const controller = new AdminController();

// Define routes here

export default router;

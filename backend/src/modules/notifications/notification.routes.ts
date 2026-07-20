import { Router } from 'express';
import { NotificationController } from './notification.controller';

const router = Router();
const controller = new NotificationController();

// Define routes here

export default router;

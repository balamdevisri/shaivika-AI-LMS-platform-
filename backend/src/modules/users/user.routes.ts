import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();
const controller = new UserController();

// Define routes here

export default router;

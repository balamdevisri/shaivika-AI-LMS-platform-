import { Router } from 'express';
import { AiController } from './ai.controller';

const router = Router();
const controller = new AiController();

router.post('/chat', controller.chat);
router.post('/quiz', controller.quiz);
router.post('/assignment', controller.assignment);
router.post('/summary', controller.summary);

export default router;
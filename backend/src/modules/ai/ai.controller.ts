import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { AiService } from './ai.service';
import { formatResponse } from '../../utils/responseFormatter';

export class AiController {
  private aiService = new AiService();

  chat = asyncHandler(async (req: Request, res: Response) => {
    res.json(formatResponse(true, {}, 'AI Chat template'));
  });

  quiz = asyncHandler(async (req: Request, res: Response) => {
    res.json(formatResponse(true, {}, 'AI Quiz template'));
  });

  assignment = asyncHandler(async (req: Request, res: Response) => {
    res.json(formatResponse(true, {}, 'AI Assignment template'));
  });

  summary = asyncHandler(async (req: Request, res: Response) => {
    res.json(formatResponse(true, {}, 'AI Summary template'));
  });
}
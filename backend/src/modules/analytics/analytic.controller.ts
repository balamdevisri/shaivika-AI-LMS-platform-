import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { formatResponse } from '../../utils/responseFormatter';
import { AnalyticService } from './analytic.service';

export class AnalyticController {
  private analyticService: AnalyticService;

  constructor() {
    this.analyticService = new AnalyticService();
  }

  // Define endpoints here
}

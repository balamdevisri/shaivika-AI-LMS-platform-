import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { formatResponse } from '../../utils/responseFormatter';
import { AuthService } from './auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Define endpoints here
}

import { Router } from 'express';
import { CertificateController } from './certificate.controller';

const router = Router();
const controller = new CertificateController();

// Define routes here

export default router;

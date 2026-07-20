const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const filesToCreate = {
  // --- ROOT ---
  "app.ts": "import express from 'express';\nimport cors from 'cors';\nimport helmet from 'helmet';\nimport { rateLimiter } from './middleware/rateLimiter.middleware';\nimport { errorMiddleware } from './middleware/error.middleware';\nimport { requestLogger } from './middleware/logger.middleware';\nimport routes from './routes';\n\nconst app = express();\n\napp.use(helmet());\napp.use(cors());\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\napp.use(rateLimiter);\napp.use(requestLogger);\n\napp.use('/api', routes);\n\napp.use(errorMiddleware);\n\nexport default app;",

  "server.ts": "import app from './app';\nimport { env } from './config/env';\nimport logger from './config/logger';\nimport './firebase';\n\nconst PORT = env.PORT || 3000;\n\napp.listen(PORT, () => {\n  logger.info(`Server is running on port ${'${PORT}'}`);\n});",

  // --- CONFIG ---
  "config/env.ts": "import dotenv from 'dotenv';\nimport { z } from 'zod';\n\ndotenv.config();\n\nconst envSchema = z.object({\n  PORT: z.string().default('3000'),\n  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),\n  FIREBASE_PROJECT_ID: z.string().optional(),\n  FIREBASE_CLIENT_EMAIL: z.string().optional(),\n  FIREBASE_PRIVATE_KEY: z.string().optional(),\n  GEMINI_API_KEY: z.string().optional(),\n});\n\nexport const env = envSchema.parse(process.env);",

  "config/logger.ts": "import winston from 'winston';\n\nconst logger = winston.createLogger({\n  level: 'info',\n  format: winston.format.combine(\n    winston.format.timestamp(),\n    winston.format.json()\n  ),\n  transports: [\n    new winston.transports.Console({\n      format: winston.format.combine(\n        winston.format.colorize(),\n        winston.format.simple()\n      )\n    }),\n    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),\n    new winston.transports.File({ filename: 'logs/combined.log' })\n  ]\n});\n\nexport default logger;",

  // --- UTILS ---
  "utils/ApiError.ts": "export class ApiError extends Error {\n  statusCode: number;\n  isOperational: boolean;\n\n  constructor(statusCode: number, message: string, isOperational = true, stack = '') {\n    super(message);\n    this.statusCode = statusCode;\n    this.isOperational = isOperational;\n    if (stack) {\n      this.stack = stack;\n    } else {\n      Error.captureStackTrace(this, this.constructor);\n    }\n  }\n}",

  "utils/asyncHandler.ts": "import { Request, Response, NextFunction } from 'express';\n\nexport const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {\n  Promise.resolve(fn(req, res, next)).catch((err) => next(err));\n};",

  "utils/responseFormatter.ts": "export const formatResponse = (success: boolean, data: any = null, message: string = '') => {\n  return {\n    success,\n    data,\n    message,\n  };\n};",

  // --- MIDDLEWARE ---
  "middleware/error.middleware.ts": "import { Request, Response, NextFunction } from 'express';\nimport logger from '../config/logger';\nimport { ApiError } from '../utils/ApiError';\n\nexport const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {\n  let { statusCode, message } = err;\n  \n  if (!(err instanceof ApiError)) {\n    statusCode = 500;\n    message = 'Internal Server Error';\n  }\n\n  res.locals.errorMessage = err.message;\n  \n  logger.error(`${'${statusCode}'} - ${'${message}'} - ${'${req.originalUrl}'} - ${'${req.method}'} - ${'${req.ip}'}`);\n  \n  res.status(statusCode).json({\n    success: false,\n    message\n  });\n};",

  "middleware/logger.middleware.ts": "import { Request, Response, NextFunction } from 'express';\nimport logger from '../config/logger';\n\nexport const requestLogger = (req: Request, res: Response, next: NextFunction) => {\n  logger.info(`Incoming request: ${'${req.method}'} ${'${req.originalUrl}'}`);\n  next();\n};",

  "middleware/rateLimiter.middleware.ts": "import rateLimit from 'express-rate-limit';\n\nexport const rateLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100,\n  message: 'Too many requests from this IP, please try again later.'\n});",

  "middleware/auth.middleware.ts": "import { Request, Response, NextFunction } from 'express';\nimport { adminAuth } from '../firebase';\nimport { ApiError } from '../utils/ApiError';\nimport { asyncHandler } from '../utils/asyncHandler';\n\nexport const requireAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {\n  const authHeader = req.headers.authorization;\n  if (!authHeader || !authHeader.startsWith('Bearer ')) {\n    throw new ApiError(401, 'Unauthorized');\n  }\n\n  const token = authHeader.split(' ')[1];\n  try {\n    const decodedToken = await adminAuth.verifyIdToken(token);\n    (req as any).user = decodedToken;\n    next();\n  } catch (error) {\n    throw new ApiError(401, 'Invalid token');\n  }\n});",

  "middleware/role.middleware.ts": "import { Request, Response, NextFunction } from 'express';\nimport { ApiError } from '../utils/ApiError';\n\nexport const requireRole = (roles: string[]) => {\n  return (req: Request, res: Response, next: NextFunction) => {\n    const user = (req as any).user;\n    if (!user || !roles.includes(user.role)) {\n      throw new ApiError(403, 'Forbidden');\n    }\n    next();\n  };\n};",

  "middleware/validation.middleware.ts": "import { Request, Response, NextFunction } from 'express';\nimport { AnyZodObject } from 'zod';\nimport { ApiError } from '../utils/ApiError';\n\nexport const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {\n  try {\n    await schema.parseAsync({\n      body: req.body,\n      query: req.query,\n      params: req.params,\n    });\n    next();\n  } catch (error: any) {\n    next(new ApiError(400, 'Validation Error: ' + error.message));\n  }\n};",

  // --- FIREBASE ---
  "firebase/index.ts": "import * as admin from 'firebase-admin';\nimport { env } from '../config/env';\n\nif (!admin.apps.length) {\n  admin.initializeApp({\n    credential: admin.credential.cert({\n      projectId: env.FIREBASE_PROJECT_ID,\n      clientEmail: env.FIREBASE_CLIENT_EMAIL,\n      privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\\\n/g, '\\n'),\n    }),\n  });\n}\n\nexport const db = admin.firestore();\nexport const adminAuth = admin.auth();\nexport const storage = admin.storage();",

  // --- GLOBAL ROUTES ENTRY ---
  "routes/index.ts": "import { Router } from 'express';\nimport authRoutes from '../modules/auth/auth.routes';\nimport userRoutes from '../modules/users/user.routes';\nimport courseRoutes from '../modules/courses/course.routes';\nimport lessonRoutes from '../modules/lessons/lesson.routes';\nimport quizRoutes from '../modules/quiz/quiz.routes';\nimport assignmentRoutes from '../modules/assignments/assignment.routes';\nimport analyticsRoutes from '../modules/analytics/analytics.routes';\nimport aiRoutes from '../modules/ai/ai.routes';\n\nconst router = Router();\n\nrouter.use('/auth', authRoutes);\nrouter.use('/users', userRoutes);\nrouter.use('/courses', courseRoutes);\nrouter.use('/lessons', lessonRoutes);\nrouter.use('/quizzes', quizRoutes);\nrouter.use('/assignments', assignmentRoutes);\nrouter.use('/analytics', analyticsRoutes);\nrouter.use('/ai', aiRoutes);\n\nexport default router;"
};

const modules = [
  'auth', 'users', 'courses', 'lessons', 'quiz', 'assignments', 'certificates', 'analytics', 'notifications', 'admin', 'students'
];

modules.forEach(mod => {
  const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
  const name = capitalize(mod);
  const singleMod = mod.endsWith('s') ? mod.slice(0, -1) : mod;
  const singleName = capitalize(singleMod);

  // Controller
  filesToCreate['modules/' + mod + '/' + singleMod + '.controller.ts'] = 
    "import { Request, Response } from 'express';\n" +
    "import { asyncHandler } from '../../utils/asyncHandler';\n" +
    "import { formatResponse } from '../../utils/responseFormatter';\n" +
    "import { " + singleName + "Service } from './" + singleMod + ".service';\n\n" +
    "export class " + singleName + "Controller {\n" +
    "  private " + singleMod + "Service: " + singleName + "Service;\n\n" +
    "  constructor() {\n" +
    "    this." + singleMod + "Service = new " + singleName + "Service();\n" +
    "  }\n\n" +
    "  // Define endpoints here\n" +
    "}\n";

  // Service
  filesToCreate['modules/' + mod + '/' + singleMod + '.service.ts'] = 
    "import { " + singleName + "Repository } from './" + singleMod + ".repository';\n\n" +
    "export class " + singleName + "Service {\n" +
    "  private " + singleMod + "Repository: " + singleName + "Repository;\n\n" +
    "  constructor() {\n" +
    "    this." + singleMod + "Repository = new " + singleName + "Repository();\n" +
    "  }\n\n" +
    "  // Define business logic here\n" +
    "}\n";

  // Repository
  filesToCreate['modules/' + mod + '/' + singleMod + '.repository.ts'] = 
    "import { db } from '../../firebase';\n\n" +
    "export class " + singleName + "Repository {\n" +
    "  private collection = db.collection('" + mod + "');\n\n" +
    "  // Define data access operations here\n" +
    "}\n";

  // Routes
  filesToCreate['modules/' + mod + '/' + singleMod + '.routes.ts'] = 
    "import { Router } from 'express';\n" +
    "import { " + singleName + "Controller } from './" + singleMod + ".controller';\n\n" +
    "const router = Router();\n" +
    "const controller = new " + singleName + "Controller();\n\n" +
    "// Define routes here\n\n" +
    "export default router;\n";
});

// AI Specific Modules
filesToCreate["modules/ai/ai.routes.ts"] = "import { Router } from 'express';\nimport { AiController } from './ai.controller';\n\nconst router = Router();\nconst controller = new AiController();\n\nrouter.post('/chat', controller.chat);\nrouter.post('/quiz', controller.quiz);\nrouter.post('/assignment', controller.assignment);\nrouter.post('/summary', controller.summary);\n\nexport default router;";

filesToCreate["modules/ai/ai.controller.ts"] = "import { Request, Response } from 'express';\nimport { asyncHandler } from '../../utils/asyncHandler';\nimport { AiService } from './ai.service';\nimport { formatResponse } from '../../utils/responseFormatter';\n\nexport class AiController {\n  private aiService = new AiService();\n\n  chat = asyncHandler(async (req: Request, res: Response) => {\n    res.json(formatResponse(true, {}, 'AI Chat template'));\n  });\n\n  quiz = asyncHandler(async (req: Request, res: Response) => {\n    res.json(formatResponse(true, {}, 'AI Quiz template'));\n  });\n\n  assignment = asyncHandler(async (req: Request, res: Response) => {\n    res.json(formatResponse(true, {}, 'AI Assignment template'));\n  });\n\n  summary = asyncHandler(async (req: Request, res: Response) => {\n    res.json(formatResponse(true, {}, 'AI Summary template'));\n  });\n}";

filesToCreate["modules/ai/ai.service.ts"] = "import { GeminiService } from './gemini.service';\nimport { PromptManager } from './prompts/promptManager';\nimport { KnowledgeRetrieval } from './retrieval/knowledgeRetrieval';\n\nexport class AiService {\n  private geminiService = new GeminiService();\n  private promptManager = new PromptManager();\n  private retrieval = new KnowledgeRetrieval();\n}";

filesToCreate["modules/ai/gemini.service.ts"] = "export class GeminiService {\n  // Setup Google Gemini API integration\n}";

filesToCreate["modules/ai/prompts/promptManager.ts"] = "export class PromptManager {\n  // Manage AI prompts\n}";

filesToCreate["modules/ai/retrieval/knowledgeRetrieval.ts"] = "export class KnowledgeRetrieval {\n  // RAG / Knowledge retrieval logic\n}";

filesToCreate["modules/ai/knowledge/markdownLoader.ts"] = "export class MarkdownLoader {\n  // Load and parse markdown documents\n}";

// TDD setup files
filesToCreate["../jest.config.js"] = "module.exports = {\n  preset: 'ts-jest',\n  testEnvironment: 'node',\n  testMatch: ['**/tests/**/*.test.ts'],\n};";
filesToCreate["../tests/auth.test.ts"] = "describe('Authentication Tests', () => {\n  it('should pass placeholder test', () => {\n    expect(true).toBe(true);\n  });\n});";

for (const [filepath, content] of Object.entries(filesToCreate)) {
  const fullPath = path.join(srcDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

console.log('Files scaffolded successfully.');

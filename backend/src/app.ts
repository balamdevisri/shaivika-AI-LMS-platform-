import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { rateLimiter } from './middleware/rateLimiter.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import routes from './routes';

const app = express();

app.use(helmet());

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, cURL, Postman)
    if (!origin) return callback(null, true);

    if (env.CORS_ORIGIN === '*') {
      return callback(null, true);
    }

    const allowedOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    
    // In development or production with configured origin, allow matching origins
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(requestLogger);

// Root connection endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Backend Connected Successfully' });
});

app.use('/api', routes);

app.use(errorMiddleware);

export default app;
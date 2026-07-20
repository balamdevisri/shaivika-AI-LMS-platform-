import app from './app';
import { env } from './config/env';
import logger from './config/logger';
import './firebase';

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${'${PORT}'}`);
});
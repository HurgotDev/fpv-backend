import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import express from 'express';
import morgan from 'morgan';

import { EXPRESS_PORT, STAGE } from '../../../config';

import AppRoutes from './routes';

import '../../auth/strategies';

/**
 * Start the express server
 */
export function start() {
  const port = EXPRESS_PORT();
  const app = express();

  // Configure middlewares
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(morgan('tiny'));

  // Configure Routes
  app.use('/api/v1', AppRoutes);

  // Start server
  app.listen(port, () => {
    if (STAGE() === 'development') {
      // eslint-disable-next-line no-console
      console.log(`Express server is started on port: ${port}`);
    }
  });
}

export default {
  up: start,
};

import dotenv from 'dotenv';

import { STAGE } from '../config';

import connectMongoDB from './db/connections/mongoose.connection';
import ServerExpress from './servers/express';
import mongoSeeds from './db/seeds/mongo.seed';

if (STAGE() === 'development') {
  dotenv.config();
}

// Connect databases
connectMongoDB();

// Seeds
mongoSeeds();

// Up express server
ServerExpress.up();

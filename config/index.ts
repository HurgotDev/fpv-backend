import { TStages } from './types.d';

export const STAGE = (): keyof TStages => (process.env.NODE_ENV as keyof TStages) || 'development';

export const NAME_DB = () => process.env.NAME_DB || 'fpv_db';

export const USER_DB = () => process.env.USER_DB || 'root';

export const PASS_DB = () => process.env.PASS_DB || '';

export const HOST_DB = () => process.env.HOST_DB || 'mongodb';

export const DIALECT_DB = () => process.env.DIALECT_DB || 'mongodb';

export const EXPRESS_PORT = () => process.env.EXPRESS_PORT || 3030;

export const JWT_ISS = () => process.env.JWT_ISS || '';

export const JWT_AUD = () => process.env.JWT_AUD || '';

export const JWT_SECRET = () => process.env.JWT_SECRET || 'secret';

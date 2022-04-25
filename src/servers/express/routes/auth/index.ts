import express from 'express';

import AuthRoutes from './auth.routes';

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/', AuthRoutes);

export default router;

import express from 'express';

import AuthRoutes from './auth';
import UsersRoutes from './users';
import FundRoutes from './funds';

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/users', UsersRoutes);
router.use('/funds', FundRoutes)

export default router;
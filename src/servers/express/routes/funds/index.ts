import express from 'express';

import FundsRouters from './funds.routes';

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/', FundsRouters);

export default router;

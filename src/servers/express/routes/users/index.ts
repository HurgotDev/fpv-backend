import express from 'express';

import UsersRouters from './users.routes';

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/', UsersRouters);

export default router;

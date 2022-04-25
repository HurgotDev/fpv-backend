import express from 'express';
import passport from 'passport';

import usersControllers from '../../controllers/users/users.controllers';

// eslint-disable-next-line new-cap
const router = express.Router();
router.use(passport.authenticate('jwt', { session: false }))

router.get('/profile', usersControllers.profileUser);
router.get('/transactions', usersControllers.getTransactions);
router.get('/funds', usersControllers.getFunds);

export default router;

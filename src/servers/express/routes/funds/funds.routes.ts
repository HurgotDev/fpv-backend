import express from 'express';
import passport from 'passport';

import fundsControllers from '../../controllers/funds/funds.controllers';

// eslint-disable-next-line new-cap
const router = express.Router();
router.use(passport.authenticate('jwt', { session: false }))

router.get('/', fundsControllers.getFunds);
router.post('/:id/subscribe', fundsControllers.suscribeUser)
router.post('/:id/cancel-subscription', fundsControllers.cancelSubscription)

export default router;

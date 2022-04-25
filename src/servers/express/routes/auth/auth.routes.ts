import express from 'express';
import passport from 'passport';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/signup', passport.authenticate('register', { session: false }), (req, res) => res.json(req.user));
router.post('/login', passport.authenticate('login', { session: false }), (req, res) => res.json(req.user));

export default router;

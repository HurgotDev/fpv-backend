import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { JWT_AUD, JWT_ISS, JWT_SECRET } from '../../../config';
import userService from '../../app/users/user.interactor';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET(),
  iss: JWT_ISS(),
  aud: JWT_AUD(),
};

passport.use(
  'jwt',
  new JwtStrategy(opts, (jwtPayload, done) => {
    try {
      userService.get(jwtPayload.sub).then((user) => {
        if (!user) return done(null, false, { message: 'User not found' });

        return done(false, user);
      });
    } catch (err) {
      done(err, false);
    }
  })
);

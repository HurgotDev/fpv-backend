import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import usersService from '../../app/users/user.interactor';
import signJwt from '../jwt/sign';

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        usersService.findBy({ $where: { username } }).then((user) => {
          if (!user) return done(null, false, { message: 'Bad username.' });

          return bcrypt.compare(password, user.password).then((response) => {
            if (!response) return done(null, false, { message: 'Password do not match.' });
            // eslint-disable-next-line no-underscore-dangle
            const token = signJwt({ sub: user._id });

            const data = {
              username: user.username,
              name: user.name,
              lastName: user.lastName,
              balance: user.balance,
            };

            return done(null, {
              accessToken: token,
              data,
            });
          });
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

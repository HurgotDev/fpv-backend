import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import usersService from '../../app/users/user.interactor';
import signJwt from '../jwt/sign';

const BCRYPT_SALT_ROUNDS = 12;

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      try {
        usersService.findBy({ $where: { username } }).then((user) => {
          if (user) return done(null, false, { message: 'User already taken' });

          return bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
            usersService
              .create({
                username,
                password: hashedPassword,
                name: req.body.username,
                lastName: req.body.lastName,
              })
              .then((userCreated) => {
                // eslint-disable-next-line no-underscore-dangle
                const token = signJwt({ sub: userCreated._id });

                const data = {
                  username: userCreated.username,
                  name: userCreated.name,
                  lastName: userCreated.lastName,
                  balance: userCreated.balance,
                };

                return done(null, {
                  accessToken: token,
                  data,
                });
              });
          });
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

import jwt from 'jsonwebtoken';

import { JWT_ISS, JWT_SECRET, JWT_AUD } from '../../../config';

const signJwt = (payload: any) => {
  return jwt.sign(
    {
      iss: JWT_ISS(),
      aud: JWT_AUD(),
      ...payload,
    },
    JWT_SECRET()
  );
};

export default signJwt;

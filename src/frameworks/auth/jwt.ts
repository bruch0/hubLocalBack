import jwt from 'jsonwebtoken';

import { GenericAuthProvider } from '@data-service';

export class AuthService implements GenericAuthProvider {
  sign = (payload: string | { [key: string]: string | number }) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

  verify = (token: string) => jwt.verify(token, process.env.JWT_SECRET);
}

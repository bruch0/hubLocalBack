import * as faker from 'faker';
import * as RandExp from 'randexp';
import { Request } from 'express';

import { AuthMiddleware } from '@middlewares';

import { AuthService } from '@auth/jwt';

describe('Auth Service', () => {
  const authService = new AuthService();
  const authMiddleware = new AuthMiddleware();

  const useMiddleware = (authorization?: string) =>
    authMiddleware.use({ headers: { authorization } } as Request, null, () => null);

  it('Should throw an error if no authorization header is provided', () => {
    expect(async () => {
      useMiddleware();
    }).rejects.toThrow('Autorização necessária');
  });

  it('Should throw an error if no authorization header does not match the regex', () => {
    expect(async () => {
      useMiddleware(faker.lorem.word());
    }).rejects.toThrow('Formato Bearer token esperado');
  });

  it('Should throw an error if the auth token is invalid', () => {
    expect(async () => {
      useMiddleware(new RandExp(/Bearer (^[\w-]*\.[\w-]*\.[\w-]*$)/).gen());
    }).rejects.toThrow('invalid token');
  });

  it('Should call "next" function if validation is correct', () => {
    const token = authService.sign({});
    const nextFunction = { fn: () => null };
    jest.spyOn(nextFunction, 'fn');

    authMiddleware.use(
      { headers: { authorization: `Bearer ${token}` } } as Request,
      null,
      nextFunction.fn,
    );

    expect(nextFunction.fn).toHaveBeenCalled();
  });
});

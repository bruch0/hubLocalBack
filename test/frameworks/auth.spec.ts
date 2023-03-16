import * as faker from 'faker';
import * as RandExp from 'randexp';

import { AuthService } from '@auth/jwt';

describe('Auth Service', () => {
  const authService = new AuthService();

  it('Should return an auth token in the expected pattern', () => {
    const authToken = authService.sign({});

    expect(authToken).not.toEqual(null);
    expect(typeof authToken).toEqual('string');
    expect(/(^[\w-]*\.[\w-]*\.[\w-]*$)/.test(authToken)).toEqual(true);
  });

  it('Should throw an error if auth token provided has a invalid format', () => {
    expect(() => {
      authService.verify(faker.random.word());
    }).toThrow();
  });

  it('Should throw an error if auth token provided is invalid', () => {
    const invalidAuthToken = new RandExp(/(^[\w-]*\.[\w-]*\.[\w-]*$)/).gen();

    expect(() => {
      authService.verify(invalidAuthToken);
    }).toThrow();
  });

  it('Should return an object when auth token is valid', () => {
    const authToken = authService.sign({});

    const authPayload = authService.verify(authToken);

    expect(authPayload).toEqual({ iat: expect.any(Number), exp: expect.any(Number) });
  });

  it('Should return the desired payload', () => {
    const authTokenPayload = { id: faker.datatype.number() };
    const authToken = authService.sign(authTokenPayload);

    const authPayload = authService.verify(authToken);

    expect(authPayload).toEqual({
      iat: expect.any(Number),
      exp: expect.any(Number),
      ...authTokenPayload,
    });
  });
});

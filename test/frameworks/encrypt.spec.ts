import * as faker from 'faker';

import { EncryptService } from '@encrypt/bcrypt';

describe('Encrypt Service', () => {
  const encryptService = new EncryptService();

  it('Should return an hashString', () => {
    const initialString = faker.random.word();
    const hashString = encryptService.encrypt(initialString);

    expect(initialString).not.toEqual(hashString);
  });

  it('Should return false if the string is not a match to the hashString', () => {
    const hashString = encryptService.encrypt(faker.random.word());

    const stringMatch = encryptService.compare(faker.random.word(), hashString);

    expect(stringMatch).toEqual(false);
  });

  it('Should return true if the string is a match to the hashString', () => {
    const initialString = faker.random.word();
    const hashString = encryptService.encrypt(initialString);

    const stringMatch = encryptService.compare(initialString, hashString);

    expect(stringMatch).toEqual(true);
  });
});

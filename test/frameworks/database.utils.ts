import * as faker from 'faker';

import { CreateUserDto, FindUserDto } from '@dtos';

export const generateFindUserDto = (): FindUserDto => {
  return {
    id: faker.datatype.number(),
    email: faker.internet.email(),
  };
};

export const generateCreateUserDto = (): CreateUserDto => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

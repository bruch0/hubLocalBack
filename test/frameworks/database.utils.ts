import * as faker from 'faker';

import {
  CreateUserDto,
  CreateCompanyDto,
  FindCompanyDto,
  FindUserDto,
  UpdateCompanyDto,
  DeleteCompanyDto,
} from '@dtos';

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

export const generateFindCompanyDto = (): FindCompanyDto => {
  return {
    id: faker.datatype.number(),
    taxId: faker.helpers.regexpStyleStringParse('[01-99].[001-999].[001-999]/[0001-9999]-[01-99]'),
  };
};

export const generateCreateCompanyDto = (): CreateCompanyDto => {
  return {
    name: faker.company.companyName(),
    siteUrl: faker.internet.url(),
    userId: faker.datatype.number(),
    taxId: faker.helpers.regexpStyleStringParse('[01-99].[001-999].[001-999]/[0001-9999]-[01-99]'),
  };
};

export const generateUpdateCompanyDto = (): UpdateCompanyDto => {
  return {
    id: faker.datatype.number(),
    name: faker.company.companyName(),
    siteUrl: faker.internet.url(),
    taxId: faker.helpers.regexpStyleStringParse('[01-99].[001-999].[001-999]/[0001-9999]-[01-99]'),
  };
};

export const generateDeleteCompanyDto = (): DeleteCompanyDto => {
  return {
    id: faker.datatype.number(),
  };
};

import * as faker from 'faker';

import {
  CreateUserDto,
  CreateCompanyDto,
  FindCompanyDto,
  FindUserDto,
  UpdateCompanyDto,
  DeleteCompanyDto,
  CreateLocalDto,
  DeleteLocalDto,
  FindLocalDto,
  UpdateLocalDto,
  GetUserCompaniesDto,
  GetCompanyLocalsDto,
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

export const generateGetUserCompaniesDto = (): GetUserCompaniesDto => {
  return {
    userId: faker.datatype.number(),
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

export const generateFindLocalDto = (): FindLocalDto => {
  return {
    id: faker.datatype.number(),
  };
};

export const generateGetCompanyLocalsDto = (): GetCompanyLocalsDto => {
  return {
    companyId: faker.datatype.number(),
  };
};

export const generateCreateLocalDto = (): CreateLocalDto => {
  return {
    name: faker.company.companyName(),
    zipcode: faker.helpers.regexpStyleStringParse('[00001-99999]-[001-999]'),
    state: faker.address.state(),
    city: faker.address.city(),
    neighborhood: faker.address.county(),
    streetAddress: faker.address.streetAddress(),
    number: faker.datatype.number(),
    companyId: faker.datatype.number(),
  };
};

export const generateUpdateLocalDto = (): UpdateLocalDto => {
  return {
    id: faker.datatype.number(),
    name: faker.company.companyName(),
    zipcode: faker.helpers.regexpStyleStringParse('[00001-99999]-[001-999]'),
    state: faker.address.state(),
    city: faker.address.city(),
    neighborhood: faker.address.county(),
    streetAddress: faker.address.streetAddress(),
    number: faker.datatype.number(),
  };
};

export const generateDeleteLocalDto = (): DeleteLocalDto => {
  return {
    id: faker.datatype.number(),
  };
};

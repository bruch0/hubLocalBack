import { TestingModule, Test } from '@nestjs/testing';
import * as faker from 'faker';

import { DatabaseService } from '@database/prisma';

import { AuthService } from '@auth/jwt';

import { EncryptService } from '@encrypt/bcrypt';

import { CreateUserDto, LoginUserDto } from '@dtos';

import { UserUseCases } from '@user/user.use-cases';
import { UserFactoryService } from '@user/user.use-cases.factory';

describe('User Usecases', () => {
  let app: TestingModule;
  let userUseCases: UserUseCases;

  const mockedEncryptService: EncryptService = {
    encrypt: () => faker.lorem.word(),
    compare: () => faker.datatype.boolean(),
  };

  const mockedAuthService: AuthService = {
    sign: () => faker.lorem.word(),
    verify: () => faker.lorem.word(),
  };

  const mockedUserFactoryService: UserFactoryService = {
    createUser: (data) => data,
    loginUser: (data) => data,
  };

  const mockedDatabaseService = {
    findUser: () => null,
    createUser: () => null,
    getUserCompanies: () => null,
    findCompany: () => null,
    createCompany: () => null,
    updateCompany: () => null,
    deleteCompany: () => null,
    getCompanyLocals: () => null,
    findLocal: () => null,
    createLocal: () => null,
    updateLocal: () => null,
    deleteLocal: () => null,
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [DatabaseService, EncryptService, AuthService, UserFactoryService, UserUseCases],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockedDatabaseService)
      .overrideProvider(EncryptService)
      .useValue(mockedEncryptService)
      .overrideProvider(AuthService)
      .useValue(mockedAuthService)
      .overrideProvider(UserFactoryService)
      .useValue(mockedUserFactoryService)
      .compile();

    userUseCases = app.get(UserUseCases);
  });

  it('Should throw an error if email provided is already taken', async () => {
    jest.spyOn(mockedDatabaseService, 'findUser').mockImplementationOnce(() => true);

    const createUserDto: CreateUserDto = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    expect(async () => {
      await userUseCases.createUser(createUserDto);
    }).rejects.toThrow('Email já cadastrado');
  });

  it('Should call the database and factory methods and return the database response', async () => {
    const databaseResponse = { id: faker.datatype.number(), email: faker.internet.email() };

    jest.spyOn(mockedDatabaseService, 'findUser').mockImplementationOnce(() => null);
    jest.spyOn(mockedDatabaseService, 'createUser').mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedUserFactoryService, 'createUser');

    const createUserDto: CreateUserDto = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const result = await userUseCases.createUser(createUserDto);

    expect(mockedDatabaseService.findUser).toHaveBeenCalled();
    expect(mockedDatabaseService.createUser).toHaveBeenCalled();
    expect(mockedUserFactoryService.createUser).toHaveBeenCalled();
    expect(result).toEqual(databaseResponse);
  });

  it('Should throw an error if email provided is not registered', async () => {
    jest.spyOn(mockedDatabaseService, 'findUser').mockImplementationOnce(() => null);

    const loginUserDto: LoginUserDto = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    expect(async () => {
      await userUseCases.loginUser(loginUserDto);
    }).rejects.toThrow('Email não registrado');
  });

  it('Should throw an error if password does not match', async () => {
    jest.spyOn(mockedDatabaseService, 'findUser').mockImplementationOnce(() => true);
    jest.spyOn(mockedEncryptService, 'compare').mockImplementationOnce(() => false);

    const loginUserDto: LoginUserDto = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    expect(async () => {
      await userUseCases.loginUser(loginUserDto);
    }).rejects.toThrow('Senha inválida');
  });

  it('Should call the database and factory methods and return the token generated', async () => {
    const databaseResponse = { password: faker.internet.password() };

    jest.spyOn(mockedDatabaseService, 'findUser').mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedEncryptService, 'compare').mockImplementationOnce(() => true);
    jest.spyOn(mockedAuthService, 'sign');
    jest.spyOn(mockedUserFactoryService, 'loginUser');

    const loginUserDto: LoginUserDto = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const result = await userUseCases.loginUser(loginUserDto);

    expect(mockedDatabaseService.findUser).toHaveBeenCalled();
    expect(mockedEncryptService.compare).toHaveBeenCalled();
    expect(mockedAuthService.sign).toHaveBeenCalled();
    expect(mockedUserFactoryService.loginUser).toHaveBeenCalled();
    expect(result).toEqual({ token: expect.any(String) });
  });
});

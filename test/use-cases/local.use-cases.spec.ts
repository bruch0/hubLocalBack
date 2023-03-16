import { TestingModule, Test } from '@nestjs/testing';
import * as faker from 'faker';

import { DatabaseService } from '@database/prisma';

import { CreateLocalDto, DeleteLocalDto, GetCompanyLocalsDto, UpdateLocalDto } from '@dtos';

import { LocalUseCases } from '@local/local.use-cases';
import { LocalFactoryService } from '@local/local.use-cases.factory';

describe('Local Usecases', () => {
  let app: TestingModule;
  let localUseCases: LocalUseCases;

  const mockedLocalFactoryService: LocalFactoryService = {
    createLocal: (data) => data,
    updateLocal: (data) => {
      return {
        ...data,
        companyId: faker.datatype.number(),
      };
    },
    deleteLocal: (data) => data,
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
      providers: [DatabaseService, LocalFactoryService, LocalUseCases],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockedDatabaseService)
      .overrideProvider(LocalFactoryService)
      .useValue(mockedLocalFactoryService)
      .compile();

    localUseCases = app.get(LocalUseCases);
  });

  it('Should call the database and factory methods and return the database response', async () => {
    const databaseResponse = [];

    jest
      .spyOn(mockedDatabaseService, 'getCompanyLocals')
      .mockImplementationOnce(() => databaseResponse);

    const getCompanyLocalsDto: GetCompanyLocalsDto = {
      userId: faker.datatype.number(),
      companyId: faker.datatype.number(),
    };

    const result = await localUseCases.getCompanyLocals(getCompanyLocalsDto);

    expect(mockedDatabaseService.getCompanyLocals).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('Should throw an error if provided companyId returns no company', async () => {
    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => null);

    const createLocalDto: CreateLocalDto = {
      name: faker.name.findName(),
      zipcode: faker.helpers.regexpStyleStringParse('[00001-99999]-[001-999]'),
      state: faker.address.state(),
      city: faker.address.city(),
      neighborhood: faker.address.county(),
      streetAddress: faker.address.streetAddress(),
      companyId: faker.datatype.number(),
    };

    expect(async () => {
      await localUseCases.createLocal(createLocalDto);
    }).rejects.toThrow('Empresa não existe');
  });

  it('Should call the database and factory methods and return the database response', async () => {
    const databaseResponse = { id: faker.datatype.number() };

    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => true);
    jest.spyOn(mockedDatabaseService, 'createLocal').mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedLocalFactoryService, 'createLocal');

    const createLocalDto: CreateLocalDto = {
      name: faker.name.findName(),
      zipcode: faker.helpers.regexpStyleStringParse('[00001-99999]-[001-999]'),
      state: faker.address.state(),
      city: faker.address.city(),
      neighborhood: faker.address.county(),
      streetAddress: faker.address.streetAddress(),
      companyId: faker.datatype.number(),
    };

    const result = await localUseCases.createLocal(createLocalDto);

    expect(mockedDatabaseService.findCompany).toHaveBeenCalled();
    expect(mockedDatabaseService.createLocal).toHaveBeenCalled();
    expect(mockedLocalFactoryService.createLocal).toHaveBeenCalled();
    expect(result).toEqual(databaseResponse);
  });

  it('Should throw an error if provided localId returns no local', async () => {
    jest.spyOn(mockedDatabaseService, 'findLocal').mockImplementationOnce(() => null);

    const updateLocalDto: UpdateLocalDto = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      zipcode: faker.helpers.regexpStyleStringParse('[00001-99999]-[001-999]'),
      state: faker.address.state(),
      city: faker.address.city(),
      neighborhood: faker.address.county(),
      streetAddress: faker.address.streetAddress(),
    };

    expect(async () => {
      await localUseCases.updateLocal(updateLocalDto);
    }).rejects.toThrow('Local não existente');
  });

  it('Should call the database and factory methods and return the database response', async () => {
    const databaseResponse = { id: faker.datatype.number() };

    jest.spyOn(mockedDatabaseService, 'findLocal').mockImplementationOnce(() => true);
    jest.spyOn(mockedDatabaseService, 'updateLocal').mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedLocalFactoryService, 'updateLocal');

    const updateLocalDto: UpdateLocalDto = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      zipcode: faker.helpers.regexpStyleStringParse('[00001-99999]-[001-999]'),
      state: faker.address.state(),
      city: faker.address.city(),
      neighborhood: faker.address.county(),
      streetAddress: faker.address.streetAddress(),
    };

    const result = await localUseCases.updateLocal(updateLocalDto);

    expect(mockedDatabaseService.findLocal).toHaveBeenCalled();
    expect(mockedDatabaseService.updateLocal).toHaveBeenCalled();
    expect(mockedLocalFactoryService.updateLocal).toHaveBeenCalled();
    expect(result).toEqual(databaseResponse);
  });

  it('Should throw an error if provided localId returns no local', async () => {
    jest.spyOn(mockedDatabaseService, 'findLocal').mockImplementationOnce(() => null);

    const deleteLocalDto: DeleteLocalDto = {
      id: faker.datatype.number(),
    };

    expect(async () => {
      await localUseCases.deleteLocal(deleteLocalDto);
    }).rejects.toThrow('Local não existente');
  });

  it('Should call the database and factory methods and return the database response', async () => {
    const databaseResponse = { id: faker.datatype.number() };

    jest.spyOn(mockedDatabaseService, 'findLocal').mockImplementationOnce(() => true);
    jest.spyOn(mockedDatabaseService, 'deleteLocal').mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedLocalFactoryService, 'deleteLocal');

    const deleteLocalDto: DeleteLocalDto = {
      id: faker.datatype.number(),
    };

    const result = await localUseCases.deleteLocal(deleteLocalDto);

    expect(mockedDatabaseService.findLocal).toHaveBeenCalled();
    expect(mockedDatabaseService.deleteLocal).toHaveBeenCalled();
    expect(mockedLocalFactoryService.deleteLocal).toHaveBeenCalled();
    expect(result).toEqual(databaseResponse);
  });
});

import { TestingModule, Test } from '@nestjs/testing';
import * as faker from 'faker';

import { DatabaseService } from '@database/prisma';

import { CreateCompanyDto, DeleteCompanyDto, GetUserCompaniesDto, UpdateCompanyDto } from '@dtos';

import { CompanyUseCases } from '@company/company.use-cases';
import { CompanyFactoryService } from '@company/company.use-cases.factory';

describe('Company Usecases', () => {
  let app: TestingModule;
  let companyUseCases: CompanyUseCases;

  const mockedCompanyFactoryService: CompanyFactoryService = {
    createCompany: (data) => data,
    updateCompany: (data) => data,
    deleteCompany: (data) => data,
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
      providers: [DatabaseService, CompanyFactoryService, CompanyUseCases],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockedDatabaseService)
      .overrideProvider(CompanyFactoryService)
      .useValue(mockedCompanyFactoryService)
      .compile();

    companyUseCases = app.get(CompanyUseCases);
  });

  it('Should call the database and factory methods and return the database response', async () => {
    const databaseResponse = [];

    jest
      .spyOn(mockedDatabaseService, 'getUserCompanies')
      .mockImplementationOnce(() => databaseResponse);

    const getUserCompaniesDto: GetUserCompaniesDto = {
      userId: faker.datatype.number(),
    };

    const result = await companyUseCases.getUserCompanies(getUserCompaniesDto);

    expect(mockedDatabaseService.getUserCompanies).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('Should throw an error if provided userId returns no user', async () => {
    jest.spyOn(mockedDatabaseService, 'findUser').mockImplementationOnce(() => null);

    const createCompanyDto: CreateCompanyDto = {
      name: faker.name.findName(),
      siteUrl: faker.internet.url(),
      taxId: faker.helpers.regexpStyleStringParse(
        '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
      ),
      userId: faker.datatype.number(),
    };

    expect(async () => {
      await companyUseCases.createCompany(createCompanyDto);
    }).rejects.toThrow('Usuário não existe');
  });

  it('Should throw an error if provided taxId is already registered', async () => {
    jest.spyOn(mockedDatabaseService, 'findUser').mockImplementationOnce(() => true);
    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => true);

    const createCompanyDto: CreateCompanyDto = {
      name: faker.name.findName(),
      siteUrl: faker.internet.url(),
      taxId: faker.helpers.regexpStyleStringParse(
        '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
      ),
      userId: faker.datatype.number(),
    };

    expect(async () => {
      await companyUseCases.createCompany(createCompanyDto);
    }).rejects.toThrow('CNPJ já cadastrado');
  });

  it('Should call the database and factory methods and return the database response', async () => {
    const databaseResponse = { id: faker.datatype.number() };

    jest.spyOn(mockedDatabaseService, 'findUser').mockImplementationOnce(() => true);
    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => false);
    jest
      .spyOn(mockedDatabaseService, 'createCompany')
      .mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedCompanyFactoryService, 'createCompany');

    const createCompanyDto: CreateCompanyDto = {
      name: faker.name.findName(),
      siteUrl: faker.internet.url(),
      taxId: faker.helpers.regexpStyleStringParse(
        '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
      ),
      userId: faker.datatype.number(),
    };

    const result = await companyUseCases.createCompany(createCompanyDto);

    expect(mockedDatabaseService.findUser).toHaveBeenCalled();
    expect(mockedDatabaseService.findCompany).toHaveBeenCalled();
    expect(mockedDatabaseService.createCompany).toHaveBeenCalled();
    expect(mockedCompanyFactoryService.createCompany).toHaveBeenCalled();
    expect(result).toEqual(databaseResponse);
  });

  it('Should throw an error if provided companyId returns no company', async () => {
    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => null);

    const updateCompanyDto: UpdateCompanyDto = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      siteUrl: faker.internet.url(),
      taxId: faker.helpers.regexpStyleStringParse(
        '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
      ),
      userId: faker.datatype.number(),
    };

    expect(async () => {
      await companyUseCases.updateCompany(updateCompanyDto);
    }).rejects.toThrow('Empresa não existente');
  });

  it('Should throw an error if provided taxId is already registered', async () => {
    const databaseResponse = { userId: faker.datatype.number() };

    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => true);

    const updateCompanyDto: UpdateCompanyDto = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      siteUrl: faker.internet.url(),
      taxId: faker.helpers.regexpStyleStringParse(
        '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
      ),
      userId: databaseResponse.userId,
    };

    expect(async () => {
      await companyUseCases.updateCompany(updateCompanyDto);
    }).rejects.toThrow('CNPJ já cadastrado');
  });

  it('Should throw an error if provided companyId does not belong to my user', async () => {
    const databaseResponse = { userId: faker.datatype.number() };

    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => databaseResponse);
    jest
      .spyOn(mockedDatabaseService, 'deleteCompany')
      .mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedCompanyFactoryService, 'deleteCompany');

    const updateCompanyDto: UpdateCompanyDto = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      siteUrl: faker.internet.url(),
      taxId: faker.helpers.regexpStyleStringParse(
        '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
      ),
      userId: faker.datatype.number(),
    };

    expect(async () => {
      await companyUseCases.updateCompany(updateCompanyDto);
    }).rejects.toThrow('Você não tem autorização para essa ação');
  });

  it('Should call the database and factory methods and return the database response', async () => {
    const databaseResponse = { userId: faker.datatype.number() };

    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => false);
    jest
      .spyOn(mockedDatabaseService, 'updateCompany')
      .mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedCompanyFactoryService, 'updateCompany');

    const updateCompanyDto: UpdateCompanyDto = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      siteUrl: faker.internet.url(),
      taxId: faker.helpers.regexpStyleStringParse(
        '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
      ),
      userId: databaseResponse.userId,
    };

    const result = await companyUseCases.updateCompany(updateCompanyDto);

    expect(mockedDatabaseService.findCompany).toHaveBeenCalled();
    expect(mockedDatabaseService.updateCompany).toHaveBeenCalled();
    expect(mockedCompanyFactoryService.updateCompany).toHaveBeenCalled();
    expect(result).toEqual(databaseResponse);
  });

  it('Should throw an error if provided companyId returns no company', async () => {
    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => null);

    const deleteCompanyDto: DeleteCompanyDto = {
      id: faker.datatype.number(),
      userId: faker.datatype.number(),
    };

    expect(async () => {
      await companyUseCases.deleteCompany(deleteCompanyDto);
    }).rejects.toThrow('Empresa não existente');
  });

  it('Should throw an error if provided companyId does not belong to my user', async () => {
    const databaseResponse = { userId: faker.datatype.number() };

    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => databaseResponse);
    jest
      .spyOn(mockedDatabaseService, 'deleteCompany')
      .mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedCompanyFactoryService, 'deleteCompany');

    const deleteCompanyDto: DeleteCompanyDto = {
      id: faker.datatype.number(),
      userId: faker.datatype.number(),
    };

    expect(async () => {
      await companyUseCases.deleteCompany(deleteCompanyDto);
    }).rejects.toThrow('Você não tem autorização para essa ação');
  });

  it('Should call the database and factory methods and return the database response', async () => {
    const databaseResponse = { userId: faker.datatype.number() };

    jest.spyOn(mockedDatabaseService, 'findCompany').mockImplementationOnce(() => databaseResponse);
    jest
      .spyOn(mockedDatabaseService, 'deleteCompany')
      .mockImplementationOnce(() => databaseResponse);
    jest.spyOn(mockedCompanyFactoryService, 'deleteCompany');

    const deleteCompanyDto: DeleteCompanyDto = {
      id: faker.datatype.number(),
      userId: databaseResponse.userId,
    };

    const result = await companyUseCases.deleteCompany(deleteCompanyDto);

    expect(mockedDatabaseService.findCompany).toHaveBeenCalled();
    expect(mockedDatabaseService.deleteCompany).toHaveBeenCalled();
    expect(mockedCompanyFactoryService.deleteCompany).toHaveBeenCalled();
    expect(result).toEqual({ userId: expect.any(Number) });
  });
});

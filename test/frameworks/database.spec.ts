import { DatabaseService } from '@database/prisma';

import {
  generateCreateCompanyDto,
  generateCreateLocalDto,
  generateCreateUserDto,
  generateDeleteCompanyDto,
  generateDeleteLocalDto,
  generateFindCompanyDto,
  generateFindLocalDto,
  generateFindUserDto,
  generateGetCompanyLocalsDto,
  generateGetUserCompaniesDto,
  generateUpdateCompanyDto,
  generateUpdateLocalDto,
} from './database.utils';

class testDatabaseService extends DatabaseService {
  rawQuery = async (query: string) => this.prismaService.$queryRawUnsafe(query);
}

describe('Database Service', () => {
  const databaseService = new testDatabaseService();

  beforeAll(async () => {
    await databaseService.rawQuery('Truncate Only "Local", "Company", "User" Restart Identity');
  });

  it('Should return null when looking for an inexistent user', async () => {
    const findUserDto = generateFindUserDto();

    const result = await databaseService.findUser(findUserDto);

    expect(result).toEqual(null);
  });

  it('Should return an user when looking for an existent user', async () => {
    const createUserDto = generateCreateUserDto();
    const user = await databaseService.createUser(createUserDto);

    const result = await databaseService.findUser(user);

    expect(result).toEqual({ ...createUserDto, id: expect.any(Number) });
  });

  it('Should throw an error when the email is taken', async () => {
    const createUserDto = generateCreateUserDto();

    await databaseService.createUser(createUserDto);

    expect(async () => {
      await databaseService.createUser(createUserDto);
    }).rejects.toThrow();
  });

  it('Should create and return the user email when the email is not taken', async () => {
    const createUserDto = generateCreateUserDto();

    const result = await databaseService.createUser(createUserDto);

    expect(result).toEqual({ email: createUserDto.email });
  });

  it('Should return null when looking for an inexistent company', async () => {
    const findCompanyDto = generateFindCompanyDto();

    const result = await databaseService.findCompany(findCompanyDto);

    expect(result).toEqual(null);
  });

  it('Should return a company when looking for an existent company', async () => {
    const createCompanyDto = generateCreateCompanyDto();
    createCompanyDto.userId = 1;
    const company = await databaseService.createCompany(createCompanyDto);

    const result = await databaseService.findCompany({ taxId: company.taxId });

    expect(result).toEqual({ ...createCompanyDto, id: expect.any(Number), deleted: false });
  });

  it('Should throw an error when the userId is invalid', async () => {
    const createCompanyDto = generateCreateCompanyDto();

    expect(async () => {
      await databaseService.createCompany(createCompanyDto);
    }).rejects.toThrow();
  });

  it('Should create and return the company data when the userId is valid', async () => {
    const createCompanyDto = generateCreateCompanyDto();
    createCompanyDto.userId = 1;

    const result = await databaseService.createCompany(createCompanyDto);

    delete createCompanyDto.userId;
    expect(result).toEqual(createCompanyDto);
  });

  it('Should throw an error when the companyId is invalid', async () => {
    const updateCompanyDto = generateUpdateCompanyDto();

    expect(async () => {
      await databaseService.updateCompany(updateCompanyDto);
    }).rejects.toThrow();
  });

  it('Should return the updated company when companyId id valid', async () => {
    const updateCompanyDto = generateUpdateCompanyDto();
    updateCompanyDto.id = 1;

    const result = await databaseService.updateCompany(updateCompanyDto);

    delete updateCompanyDto.id;
    expect(result).toEqual(updateCompanyDto);
  });

  it('Should an empty array of companies', async () => {
    const getUserCompaniesDto = generateGetUserCompaniesDto();

    const result = await databaseService.getUserCompanies(getUserCompaniesDto);

    expect(result).toEqual([]);
  });

  it('Should an array of companies', async () => {
    const getUserCompaniesDto = generateGetUserCompaniesDto();
    getUserCompaniesDto.userId = 1;

    const result = await databaseService.getUserCompanies(getUserCompaniesDto);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          taxId: expect.any(String),
          siteUrl: expect.any(String),
        }),
      ]),
    );
  });

  it('Should throw an error when the companyId is invalid', async () => {
    const deleteCompanyDto = generateDeleteCompanyDto();

    expect(async () => {
      await databaseService.deleteCompany(deleteCompanyDto);
    }).rejects.toThrow();
  });

  it('Should return the deleted company when companyId id valid', async () => {
    const deleteCompanyDto = generateDeleteCompanyDto();
    deleteCompanyDto.id = 1;

    const result = await databaseService.deleteCompany(deleteCompanyDto);

    expect(result).toEqual({
      name: expect.any(String),
      siteUrl: expect.any(String),
      taxId: expect.any(String),
    });
  });

  it('Should return null when looking for an inexistent local', async () => {
    const findLocalDto = generateFindLocalDto();

    const result = await databaseService.findLocal(findLocalDto);

    expect(result).toEqual(null);
  });

  it('Should return a local when looking for an existent local', async () => {
    const createLocalDto = generateCreateLocalDto();
    createLocalDto.companyId = 1;
    await databaseService.createLocal(createLocalDto);

    const result = await databaseService.findLocal({ id: 1 });

    expect(result).toEqual({ ...createLocalDto, id: expect.any(Number), deleted: false });
  });

  it('Should throw an error when the companyId is invalid', async () => {
    const createLocalDto = generateCreateLocalDto();

    expect(async () => {
      await databaseService.createLocal(createLocalDto);
    }).rejects.toThrow();
  });

  it('Should create and return the local data when the companyId is valid', async () => {
    const createLocalDto = generateCreateLocalDto();
    createLocalDto.companyId = 1;

    const result = await databaseService.createLocal(createLocalDto);

    delete createLocalDto.companyId;
    expect(result).toEqual({ ...createLocalDto, number: expect.any(Number) });
  });

  it('Should throw an error when the localId is invalid', async () => {
    const updateLocalDto = generateUpdateLocalDto();

    expect(async () => {
      await databaseService.updateLocal(updateLocalDto);
    }).rejects.toThrow();
  });

  it('Should return the updated local when localId id valid', async () => {
    const updateLocalDto = generateUpdateLocalDto();
    updateLocalDto.id = 1;

    const result = await databaseService.updateLocal(updateLocalDto);

    delete updateLocalDto.id;
    expect(result).toEqual({ ...updateLocalDto, number: expect.any(Number) });
  });

  it('Should an empty array of locals', async () => {
    const getCompanyLocalsDto = generateGetCompanyLocalsDto();

    const result = await databaseService.getCompanyLocals(getCompanyLocalsDto);

    expect(result).toEqual([]);
  });

  it('Should an array of locals', async () => {
    const getCompanyLocalsDto = generateGetCompanyLocalsDto();
    getCompanyLocalsDto.companyId = 1;

    const result = await databaseService.getCompanyLocals(getCompanyLocalsDto);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          zipcode: expect.any(String),
          state: expect.any(String),
          city: expect.any(String),
          neighborhood: expect.any(String),
          streetAddress: expect.any(String),
          number: expect.any(Number),
        }),
      ]),
    );
  });

  it('Should throw an error when the localId is invalid', async () => {
    const deleteLocalDto = generateDeleteLocalDto();

    expect(async () => {
      await databaseService.deleteLocal(deleteLocalDto);
    }).rejects.toThrow();
  });

  it('Should return the deleted local when localId id valid', async () => {
    const deleteLocalDto = generateDeleteLocalDto();
    deleteLocalDto.id = 1;

    const result = await databaseService.deleteLocal(deleteLocalDto);

    expect(result).toEqual({
      name: expect.any(String),
      zipcode: expect.any(String),
      state: expect.any(String),
      city: expect.any(String),
      neighborhood: expect.any(String),
      streetAddress: expect.any(String),
      number: expect.any(Number),
    });
  });
});

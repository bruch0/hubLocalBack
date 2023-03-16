import { DatabaseService } from '@database/prisma';

import {
  generateCreateCompanyDto,
  generateCreateUserDto,
  generateFindCompanyDto,
  generateFindUserDto,
} from './database.utils';

class testDatabaseService extends DatabaseService {
  rawQuery = async (query: string) => this.prismaService.$queryRawUnsafe(query);
}

describe('Database Service', () => {
  const databaseService = new testDatabaseService();

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
});

import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';

import { DatabaseService } from '@database/prisma';

import { CompanyController } from '@controllers';

import { CreateCompanyDto, UpdateCompanyDto, DeleteCompanyDto } from '@dtos';

import { CompanyFactoryService } from '@company/company.use-cases.factory';
import { CompanyUseCases } from '@company/company.use-cases';

describe('Controller', () => {
  let app: TestingModule;

  const mockedCompanyUseCases = {
    getUserCompanies: () => null,
    createCompany: () => null,
    updateCompany: () => null,
    deleteCompany: () => null,
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [DatabaseService, CompanyFactoryService, CompanyUseCases],
    })
      .overrideProvider(CompanyUseCases)
      .useValue(mockedCompanyUseCases)
      .compile();
  });

  describe('Company Controller', () => {
    it('Should call the "getCompanyLocals" usecase', async () => {
      const controller = app.get(CompanyController);
      jest.spyOn(mockedCompanyUseCases, 'getUserCompanies');

      const getUserCompaniesDto = {
        userId: faker.datatype.number(),
        itemsPerPage: 10,
        pageNumber: 1,
      };

      await controller.getUserCompanies(10, 1, JSON.stringify(getUserCompaniesDto));

      expect(mockedCompanyUseCases.getUserCompanies).toHaveBeenCalledWith(getUserCompaniesDto);
    });

    it('Should call the "createCompany" usecase', async () => {
      const controller = app.get(CompanyController);
      jest.spyOn(mockedCompanyUseCases, 'createCompany');

      const createCompanyDto: CreateCompanyDto = {
        name: faker.name.findName(),
        siteUrl: faker.internet.url(),
        taxId: faker.helpers.regexpStyleStringParse(
          '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
        ),
        userId: faker.datatype.number(),
      };

      await controller.createCompany(
        createCompanyDto,
        JSON.stringify({ userId: createCompanyDto.userId }),
      );

      expect(mockedCompanyUseCases.createCompany).toHaveBeenCalledWith(createCompanyDto);
    });

    it('Should call the "updateCompany" usecase', async () => {
      const controller = app.get(CompanyController);
      jest.spyOn(mockedCompanyUseCases, 'updateCompany');

      const updateCompanyDto: UpdateCompanyDto = {
        id: faker.datatype.number(),
        name: faker.name.findName(),
        siteUrl: faker.internet.url(),
        taxId: faker.helpers.regexpStyleStringParse(
          '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
        ),
        userId: faker.datatype.number(),
      };

      await controller.updateCompany(
        updateCompanyDto,
        JSON.stringify({ userId: updateCompanyDto.userId }),
      );

      expect(mockedCompanyUseCases.updateCompany).toHaveBeenCalledWith(updateCompanyDto);
    });

    it('Should call the "deleteCompany" usecase', async () => {
      const controller = app.get(CompanyController);
      jest.spyOn(mockedCompanyUseCases, 'deleteCompany');

      const deleteCompanyDto: DeleteCompanyDto = {
        id: faker.datatype.number(),
        userId: faker.datatype.number(),
      };

      await controller.deleteCompany(
        deleteCompanyDto.id,
        JSON.stringify({ userId: deleteCompanyDto.userId }),
      );

      expect(mockedCompanyUseCases.deleteCompany).toHaveBeenCalledWith(deleteCompanyDto);
    });
  });
});

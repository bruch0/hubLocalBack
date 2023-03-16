import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';

import { DatabaseService } from '@database/prisma';

import { CompanyController } from '@controllers';

import { CreateCompanyDto, UpdateCompanyDto, DeleteCompanyDto } from '@dtos';

import { CompanyFactoryService } from '@company/company.use-cases.factory';
import { CompanyUseCases } from '@company/company.use-cases';

describe('Controller', () => {
  let app: TestingModule;

  const companyUseCases = {
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
      .useValue(companyUseCases)
      .compile();
  });

  describe('Company Controller', () => {
    it('Should call the "getCompanyLocals" usecase', async () => {
      const controller = app.get(CompanyController);
      jest.spyOn(companyUseCases, 'getUserCompanies');

      const getUserCompaniesDto = {
        userId: faker.datatype.number(),
      };

      await controller.getUserCompanies(JSON.stringify(getUserCompaniesDto));

      expect(companyUseCases.getUserCompanies).toHaveBeenCalledWith(getUserCompaniesDto);
    });

    it('Should call the "createCompany" usecase', async () => {
      const controller = app.get(CompanyController);
      jest.spyOn(companyUseCases, 'createCompany');

      const createCompanyDto: CreateCompanyDto = {
        name: faker.name.findName(),
        siteUrl: faker.internet.url(),
        taxId: faker.helpers.regexpStyleStringParse(
          '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
        ),
        userId: faker.datatype.number(),
      };

      await controller.createCompany(createCompanyDto);

      expect(companyUseCases.createCompany).toHaveBeenCalledWith(createCompanyDto);
    });

    it('Should call the "updateCompany" usecase', async () => {
      const controller = app.get(CompanyController);
      jest.spyOn(companyUseCases, 'updateCompany');

      const updateCompanyDto: UpdateCompanyDto = {
        id: faker.datatype.number(),
        name: faker.name.findName(),
        siteUrl: faker.internet.url(),
        taxId: faker.helpers.regexpStyleStringParse(
          '[01-99].[001-999].[001-999]/[0001-9999]-[01-99]',
        ),
      };

      await controller.updateCompany(updateCompanyDto);

      expect(companyUseCases.updateCompany).toHaveBeenCalledWith(updateCompanyDto);
    });

    it('Should call the "deleteCompany" usecase', async () => {
      const controller = app.get(CompanyController);
      jest.spyOn(companyUseCases, 'deleteCompany');

      const deleteCompanyDto: DeleteCompanyDto = {
        id: faker.datatype.number(),
      };

      await controller.deleteCompany(deleteCompanyDto);

      expect(companyUseCases.deleteCompany).toHaveBeenCalledWith(deleteCompanyDto);
    });
  });
});

import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@database/prisma';

import { CreateCompanyDto, UpdateCompanyDto, DeleteCompanyDto } from '@dtos';

import { CompanyFactoryService } from './company.use-cases.factory';

@Injectable()
export class CompanyUseCases {
  constructor(
    private databaseService: DatabaseService,
    private companyFactoryService: CompanyFactoryService,
  ) {}

  async createCompany(companyData: CreateCompanyDto): Promise<void> {
    const newCompany = this.companyFactoryService.createCompany(companyData);

    await this.databaseService.createCompany(newCompany);
  }

  async updateCompany(companyData: UpdateCompanyDto): Promise<void> {
    const company = this.companyFactoryService.updateCompany(companyData);

    await this.databaseService.updateCompany({
      ...company,
      companyId: company.id,
    });
  }

  async deleteCompany(companyData: DeleteCompanyDto): Promise<void> {
    const company = this.companyFactoryService.deleteCompany(companyData);

    await this.databaseService.deleteCompany({ companyId: company.id });
  }
}

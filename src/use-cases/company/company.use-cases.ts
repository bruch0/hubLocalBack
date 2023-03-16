import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '@database/prisma';

import { ResponseCompany } from '@entities';

import { CreateCompanyDto, UpdateCompanyDto, DeleteCompanyDto } from '@dtos';

import { CompanyFactoryService } from './company.use-cases.factory';

@Injectable()
export class CompanyUseCases {
  constructor(
    private databaseService: DatabaseService,
    private companyFactoryService: CompanyFactoryService,
  ) {}

  async createCompany(companyData: CreateCompanyDto): Promise<ResponseCompany> {
    const newCompany = this.companyFactoryService.createCompany(companyData);

    const validUser = await this.databaseService.findUser({
      id: newCompany.userId,
    });
    if (!validUser) throw new NotFoundException('Usuário não existe');

    const taxIdIsTaken = await this.databaseService.findCompany({
      taxId: newCompany.taxId,
    });
    if (taxIdIsTaken) throw new ConflictException('CNPJ já cadastrado');

    return await this.databaseService.createCompany(newCompany);
  }

  async updateCompany(companyData: UpdateCompanyDto): Promise<ResponseCompany> {
    const company = this.companyFactoryService.updateCompany(companyData);

    const validCompany = await this.databaseService.findCompany({
      id: company.id,
    });
    if (!validCompany) throw new NotFoundException('Empresa não existente');

    const taxIdIsTaken = await this.databaseService.findCompany({
      taxId: company.taxId,
    });
    if (taxIdIsTaken && company.id !== taxIdIsTaken.id)
      throw new ConflictException('CNPJ já cadastrado');

    return await this.databaseService.updateCompany(company);
  }

  async deleteCompany(companyData: DeleteCompanyDto): Promise<void> {
    const company = this.companyFactoryService.deleteCompany(companyData);

    const validCompany = await this.databaseService.findCompany({
      id: company.id,
    });
    if (!validCompany) throw new NotFoundException('Empresa não existente');

    await this.databaseService.deleteCompany(company);
  }
}

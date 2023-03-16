import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { DatabaseService } from '@database/prisma';

import { ResponseCompany } from '@entities';

import { CreateCompanyDto, UpdateCompanyDto, DeleteCompanyDto, GetUserCompaniesDto } from '@dtos';

import { CompanyFactoryService } from './company.use-cases.factory';

@Injectable()
export class CompanyUseCases {
  constructor(
    private databaseService: DatabaseService,
    private companyFactoryService: CompanyFactoryService,
  ) {}

  async getUserCompanies(getUserCompaniesDto: GetUserCompaniesDto): Promise<ResponseCompany[]> {
    return this.databaseService.getUserCompanies(getUserCompaniesDto);
  }

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<ResponseCompany> {
    const newCompany = this.companyFactoryService.createCompany(createCompanyDto);

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

  async updateCompany(updateCompanyDto: UpdateCompanyDto): Promise<ResponseCompany> {
    const company = this.companyFactoryService.updateCompany(updateCompanyDto);

    const validCompany = await this.databaseService.findCompany({
      id: company.id,
    });
    if (!validCompany) throw new NotFoundException('Empresa não existente');

    if (validCompany.userId !== company.userId) throw new ForbiddenException();

    const taxIdIsTaken = await this.databaseService.findCompany({
      taxId: company.taxId,
    });
    if (taxIdIsTaken && company.id !== taxIdIsTaken.id)
      throw new ConflictException('CNPJ já cadastrado');

    return await this.databaseService.updateCompany(company);
  }

  async deleteCompany(deleteCompanyDto: DeleteCompanyDto): Promise<ResponseCompany> {
    const company = this.companyFactoryService.deleteCompany(deleteCompanyDto);

    const validCompany = await this.databaseService.findCompany({
      id: company.id,
    });
    if (!validCompany) throw new NotFoundException('Empresa não existente');

    if (validCompany.userId !== company.userId) throw new ForbiddenException();

    return await this.databaseService.deleteCompany(company);
  }
}

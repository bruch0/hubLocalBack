import { Injectable } from '@nestjs/common';

import { Company } from '@entities';

import { CreateCompanyDto, UpdateCompanyDto, DeleteCompanyDto } from '@dtos';

@Injectable()
export class CompanyFactoryService {
  createCompany(createCompanyDto: CreateCompanyDto) {
    const newCompany = new Company();

    newCompany.name = createCompanyDto.name;
    newCompany.siteUrl = createCompanyDto.siteUrl;
    newCompany.taxId = createCompanyDto.taxId;
    newCompany.userId = createCompanyDto.userId;

    return newCompany;
  }

  updateCompany(updateCompanyDto: UpdateCompanyDto) {
    const company = new Company();

    company.name = updateCompanyDto.name;
    company.siteUrl = updateCompanyDto.siteUrl;
    company.taxId = updateCompanyDto.taxId;

    return company;
  }

  deleteCompany(deleteCompanyDto: DeleteCompanyDto) {
    const company = new Company();

    company.id = deleteCompanyDto.companyId;

    return company;
  }
}

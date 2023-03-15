import { Controller, Post, Body, Put, Delete } from '@nestjs/common';

import { CreateCompanyDto, UpdateCompanyDto, DeleteCompanyDto } from '@dtos';

import { CompanyUseCases } from '@company/company.use-cases';

@Controller('companies')
export class CompanyController {
  constructor(private companyUseCases: CompanyUseCases) {}

  @Post()
  createCompany(@Body() companyData: CreateCompanyDto) {
    return this.companyUseCases.createCompany(companyData);
  }

  @Put()
  updateCompany(@Body() companyData: UpdateCompanyDto) {
    return this.companyUseCases.updateCompany(companyData);
  }

  @Delete()
  deleteCompany(@Body() companyData: DeleteCompanyDto) {
    return this.companyUseCases.deleteCompany(companyData);
  }
}
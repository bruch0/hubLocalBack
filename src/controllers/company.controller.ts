import { Controller, Post, Body, Put, Delete, Get, Headers } from '@nestjs/common';

import { CreateCompanyDto, UpdateCompanyDto, DeleteCompanyDto } from '@dtos';

import { CompanyUseCases } from '@company/company.use-cases';

@Controller('companies')
export class CompanyController {
  constructor(private companyUseCases: CompanyUseCases) {}

  @Get('')
  getUserCompanies(@Headers('authorization') authorization: string) {
    const { userId } = JSON.parse(authorization);

    return this.companyUseCases.getUserCompanies({ userId });
  }

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

import { Controller, Post, Body, Put, Delete, Get, Headers } from '@nestjs/common';
import { ApiResponse, ApiHeader } from '@nestjs/swagger';

import {
  CreateCompanyRequestBodyDto,
  UpdateCompanyRequestBodyDto,
  DeleteCompanyRequestBodyDto,
} from '@dtos';

import { CompanyUseCases } from '@company/company.use-cases';

@Controller('companies')
export class CompanyController {
  constructor(private companyUseCases: CompanyUseCases) {}

  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('')
  getUserCompanies(@Headers('authorization') authorization: string) {
    const { userId } = JSON.parse(authorization);

    return this.companyUseCases.getUserCompanies({ userId });
  }

  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Post()
  createCompany(
    @Body() companyData: CreateCompanyRequestBodyDto,
    @Headers('authorization') authorization: string,
  ) {
    const { userId } = JSON.parse(authorization);

    return this.companyUseCases.createCompany({ ...companyData, userId });
  }

  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Put()
  updateCompany(
    @Body() companyData: UpdateCompanyRequestBodyDto,
    @Headers('authorization') authorization: string,
  ) {
    const { userId } = JSON.parse(authorization);
    return this.companyUseCases.updateCompany({ ...companyData, userId });
  }

  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete()
  deleteCompany(
    @Body() companyData: DeleteCompanyRequestBodyDto,
    @Headers('authorization') authorization: string,
  ) {
    const { userId } = JSON.parse(authorization);

    return this.companyUseCases.deleteCompany({ ...companyData, userId });
  }
}

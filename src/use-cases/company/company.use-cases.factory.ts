import { Injectable } from '@nestjs/common';

import { Company } from '@entities';

import { CreateCompanyDto, UpdateCompanyDto, DeleteCompanyDto } from '@dtos';

type CreateCompanyFactoryReturn = {
  name: string;
  siteUrl: string;
  taxId: string;
  userId: number;
};

type UpdateCompanyFactoryReturn = {
  id: number;
  name: string;
  siteUrl: string;
  taxId: string;
  userId: number;
};

type DeleteCompanyFactoryReturn = {
  id: number;
  userId: number;
};

@Injectable()
export class CompanyFactoryService {
  createCompany(createCompanyDto: CreateCompanyDto): CreateCompanyFactoryReturn {
    const newCompany: CreateCompanyFactoryReturn = new Company(createCompanyDto);

    return newCompany;
  }

  updateCompany(updateCompanyDto: UpdateCompanyDto): UpdateCompanyFactoryReturn {
    const company: UpdateCompanyFactoryReturn = new Company(updateCompanyDto);

    return company;
  }

  deleteCompany(deleteCompanyDto: DeleteCompanyDto): DeleteCompanyFactoryReturn {
    const company: DeleteCompanyFactoryReturn = new Company(deleteCompanyDto);

    return company;
  }
}

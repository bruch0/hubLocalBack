type CompanyDto = {
  id?: number;
  name?: string;
  siteUrl?: string;
  taxId?: string;
  userId?: number;
};

export class Company {
  constructor(companyDto: CompanyDto) {
    this.id = companyDto.id;
    this.name = companyDto.name;
    this.siteUrl = companyDto.siteUrl;
    this.taxId = companyDto.taxId;
    this.userId = companyDto.userId;
  }

  id: number;
  name: string;
  siteUrl: string;
  taxId: string;
  userId: number;
  deleted: boolean;
}

export class ResponseCompany {
  name: string;
  siteUrl: string;
  taxId: string;
}

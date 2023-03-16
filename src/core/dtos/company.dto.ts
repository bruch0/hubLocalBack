import { IsString, IsNotEmpty, IsNumber, IsUrl, Matches } from 'class-validator';

export class GetCompanyDto {
  @IsNumber()
  @IsNotEmpty()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
  taxId?: string;
}

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  siteUrl: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
  taxId: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class UpdateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  siteUrl: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
  taxId: string;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}

export class DeleteCompanyDto {
  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}

export class GetUserCompaniesDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

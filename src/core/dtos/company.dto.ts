import { IsString, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

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

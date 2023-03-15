import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @IsString()
  number: number;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}

export class UpdateLocalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsNumber()
  @IsNotEmpty()
  localId: number;
}

export class DeleteLocalDto {
  @IsNumber()
  @IsNotEmpty()
  localId: number;
}

export class GetCompanyLocalsDto {
  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}

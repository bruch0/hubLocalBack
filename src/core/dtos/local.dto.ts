import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class GetLocalDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

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

  @IsNumber()
  number?: number;

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

  @IsNumber()
  number?: number;

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

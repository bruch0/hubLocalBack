import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class FindLocalDto {
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
  @IsNumber()
  @IsNotEmpty()
  id: number;

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
}

export class DeleteLocalDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class GetCompanyLocalsDto {
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

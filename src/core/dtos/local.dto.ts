import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class FindLocalDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class CreateLocalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @ApiPropertyOptional()
  @IsNumber()
  number?: number;

  @ApiProperty()
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

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class UpdateLocalRequestBodyDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @ApiPropertyOptional()
  @IsNumber()
  number?: number;
}

export class DeleteLocalDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class DeleteLocalRequestBodyDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class GetCompanyLocalsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

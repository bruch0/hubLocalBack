import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class FindUserDto {
  @IsNumber()
  @IsNotEmpty()
  id?: number;

  @IsString()
  @IsNotEmpty()
  email?: string;
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

import { User, Company, Local } from '@entities';
import {
  CreateCompanyDto,
  CreateLocalDto,
  CreateUserDto,
  DeleteCompanyDto,
  DeleteLocalDto,
  GetCompanyLocalsDto,
  GetUserCompaniesDto,
  LoginUserDto,
} from '@dtos';

export class GenericDatabase {
  createUser: (createUserDto: CreateUserDto) => Promise<User>;
  findUser: (loginUserDto: LoginUserDto) => Promise<User>;
  getUserCompanies: (
    getUserCompaniesDto: GetUserCompaniesDto,
  ) => Promise<Company[]>;
  createCompany: (createCompanyDto: CreateCompanyDto) => Promise<Company>;
  deleteCompany: (deleteCompanyDto: DeleteCompanyDto) => Promise<Company>;
  getCompanyLocals: (
    getCompanyLocalsDto: GetCompanyLocalsDto,
  ) => Promise<Local[]>;
  createLocal: (createLocalDto: CreateLocalDto) => Promise<Local>;
  deleteLocal: (deleteLocalDto: DeleteLocalDto) => Promise<Local>;
  rawQuery: (query: string) => any;
}

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
  UpdateCompanyDto,
  UpdateLocalDto,
} from '@dtos';

export class GenericDatabase {
  createUser: (createUserDto: CreateUserDto) => Promise<void>;
  findUser: (loginUserDto: LoginUserDto) => Promise<User>;
  getUserCompanies: (
    getUserCompaniesDto: GetUserCompaniesDto,
  ) => Promise<Company[]>;
  createCompany: (createCompanyDto: CreateCompanyDto) => Promise<Company>;
  updateCompany: (updateCompanyDto: UpdateCompanyDto) => Promise<Company>;
  deleteCompany: (deleteCompanyDto: DeleteCompanyDto) => Promise<Company>;
  getCompanyLocals: (
    getCompanyLocalsDto: GetCompanyLocalsDto,
  ) => Promise<Local[]>;
  createLocal: (createLocalDto: CreateLocalDto) => Promise<Local>;
  updateLocal: (updateLocalDto: UpdateLocalDto) => Promise<Local>;
  deleteLocal: (deleteLocalDto: DeleteLocalDto) => Promise<Local>;
  rawQuery: (query: string) => any;
}

export class GenericEncrypter {
  encrypt: (data: string) => string;
  compare: (data: string, hashData: string) => boolean;
}

export class GenericAuthProvider {
  sign: (payload: string | { [key: string]: string | number }) => string;
  verify: (data: string) => string | { [key: string]: string | number };
}

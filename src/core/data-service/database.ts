import { User, Company, Local, ResponseCompany, ResponseUser, ResponseLocal } from '@entities';
import {
  CreateCompanyDto,
  CreateLocalDto,
  CreateUserDto,
  DeleteCompanyDto,
  DeleteLocalDto,
  FindCompanyDto,
  GetCompanyLocalsDto,
  FindLocalDto,
  GetUserCompaniesDto,
  LoginUserDto,
  UpdateCompanyDto,
  UpdateLocalDto,
} from '@dtos';

export class GenericDatabase {
  findUser: (loginUserDto: LoginUserDto) => Promise<User>;

  createUser: (createUserDto: CreateUserDto) => Promise<ResponseUser>;

  getUserCompanies: (getUserCompaniesDto: GetUserCompaniesDto) => Promise<ResponseCompany[]>;

  findCompany: (findCompanyDto: FindCompanyDto) => Promise<Company>;

  createCompany: (createCompanyDto: CreateCompanyDto) => Promise<ResponseCompany>;

  updateCompany: (updateCompanyDto: UpdateCompanyDto) => Promise<ResponseCompany>;

  deleteCompany: (deleteCompanyDto: DeleteCompanyDto) => Promise<ResponseCompany>;

  getCompanyLocals: (getCompanyLocalsDto: GetCompanyLocalsDto) => Promise<ResponseLocal[]>;

  findLocal: (findLocalDto: FindCompanyDto) => Promise<Local>;

  createLocal: (createLocalDto: CreateLocalDto) => Promise<ResponseLocal>;

  updateLocal: (updateLocalDto: UpdateLocalDto) => Promise<ResponseLocal>;

  deleteLocal: (deleteLocalDto: DeleteLocalDto) => Promise<ResponseLocal>;
}

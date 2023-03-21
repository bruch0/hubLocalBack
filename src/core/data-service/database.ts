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

  getUserCompanies: (
    getUserCompaniesDto: GetUserCompaniesDto,
  ) => Promise<{ companies: ResponseCompany[]; pages: number }>;

  findCompany: (findCompanyDto: FindCompanyDto) => Promise<Company>;

  createCompany: (createCompanyDto: CreateCompanyDto) => Promise<ResponseCompany>;

  updateCompany: (updateCompanyDto: UpdateCompanyDto) => Promise<ResponseCompany>;

  deleteCompany: (deleteCompanyDto: DeleteCompanyDto) => Promise<ResponseCompany>;

  getCompanyLocals: (
    getCompanyLocalsDto: GetCompanyLocalsDto,
  ) => Promise<{ locals: ResponseLocal[]; pages: number }>;

  findLocal: (findLocalDto: FindLocalDto) => Promise<{
    number: number;
    name: string;
    zipcode: string;
    state: string;
    city: string;
    neighborhood: string;
    streetAddress: string;
    company: {
      userId: number;
    };
  }>;

  createLocal: (createLocalDto: CreateLocalDto) => Promise<ResponseLocal>;

  updateLocal: (updateLocalDto: UpdateLocalDto) => Promise<ResponseLocal>;

  deleteLocal: (deleteLocalDto: DeleteLocalDto) => Promise<ResponseLocal>;
}

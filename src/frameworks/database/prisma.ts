import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { GenericDatabase } from '@data-service';

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

class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await this.$disconnect();
      await app.close();
    });
  }
}

export class DatabaseService implements GenericDatabase {
  prismaService = new PrismaService();

  createUser = async (createUserDto: CreateUserDto) =>
    await this.prismaService.user.create({ data: createUserDto });

  findUser = async (loginUserDto: Omit<LoginUserDto, 'password'>) =>
    await this.prismaService.user.findFirst({ where: loginUserDto });

  getUserCompanies = async (getUserCompaniesDto: GetUserCompaniesDto) =>
    await this.prismaService.company.findMany({
      where: { ...getUserCompaniesDto, deleted: false },
    });

  createCompany = async (createCompanyDto: CreateCompanyDto) =>
    await this.prismaService.company.create({ data: createCompanyDto });

  deleteCompany = async (deleteCompanyDto: DeleteCompanyDto) =>
    await this.prismaService.company.delete({
      where: { id: deleteCompanyDto.companyId },
    });

  getCompanyLocals = async (getCompanyLocalsDto: GetCompanyLocalsDto) =>
    await this.prismaService.local.findMany({
      where: { ...getCompanyLocalsDto, deleted: false },
    });

  createLocal = async (createLocalDto: CreateLocalDto) => {
    const localData: Omit<CreateLocalDto, 'companyId'> = createLocalDto;

    return await this.prismaService.local.create({
      data: {
        ...localData,
        company: { connect: { id: createLocalDto.companyId } },
      },
    });
  };

  deleteLocal = async (deleteLocalDto: DeleteLocalDto) =>
    await this.prismaService.local.delete({
      where: { id: deleteLocalDto.localId },
    });

  rawQuery = async (query: string) => this.prismaService.$queryRawUnsafe(query);
}

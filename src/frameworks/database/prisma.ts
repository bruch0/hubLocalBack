import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { GenericDatabase } from '@data-service';

import {
  CreateCompanyDto,
  CreateLocalDto,
  CreateUserDto,
  DeleteCompanyDto,
  DeleteLocalDto,
  FindUserDto,
  FindCompanyDto,
  GetCompanyLocalsDto,
  FindLocalDto,
  GetUserCompaniesDto,
  UpdateCompanyDto,
  UpdateLocalDto,
} from '@dtos';
import { ResponseLocal } from '@entities';

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

  findUser = async (loginUserDto: FindUserDto) =>
    await this.prismaService.user.findFirst({ where: loginUserDto });

  createUser = async (createUserDto: CreateUserDto) =>
    await this.prismaService.user.create({ data: createUserDto, select: { email: true } });

  getUserCompanies = async (getUserCompaniesDto: GetUserCompaniesDto) =>
    await this.prismaService.company.findMany({
      where: { ...getUserCompaniesDto, deleted: false },
      select: {
        id: true,
        name: true,
        taxId: true,
        siteUrl: true,
      },
    });

  findCompany = async (findCompanyDto: FindCompanyDto) =>
    await this.prismaService.company.findFirst({
      where: { ...findCompanyDto, deleted: false },
    });

  createCompany = async (createCompanyDto: CreateCompanyDto) =>
    await this.prismaService.company.create({
      data: createCompanyDto,
      select: { name: true, taxId: true, siteUrl: true },
    });

  updateCompany = async (updateCompanyDto: UpdateCompanyDto) => {
    const companyUpdateData: UpdateCompanyDto = { ...updateCompanyDto };
    delete companyUpdateData.id;

    return await this.prismaService.company.update({
      data: companyUpdateData,
      where: { id: updateCompanyDto.id },
      select: {
        name: true,
        taxId: true,
        siteUrl: true,
      },
    });
  };

  deleteCompany = async (deleteCompanyDto: DeleteCompanyDto) =>
    await this.prismaService.company.update({
      data: { deleted: true },
      where: deleteCompanyDto,
      select: {
        name: true,
        taxId: true,
        siteUrl: true,
      },
    });

  getCompanyLocals = async (getCompanyLocalsDto: GetCompanyLocalsDto) => {
    const { companyId, userId } = getCompanyLocalsDto;

    return await this.prismaService.local.findMany({
      where: { company: { id: companyId, userId: userId }, deleted: false },
      select: {
        id: true,
        name: true,
        zipcode: true,
        state: true,
        city: true,
        neighborhood: true,
        streetAddress: true,
        number: true,
      },
    });
  };
  findLocal = async (findLocalDto: FindLocalDto) =>
    await this.prismaService.local.findFirst({
      where: { ...findLocalDto, deleted: false },
    });

  createLocal = async (createLocalDto: CreateLocalDto) =>
    await this.prismaService.local.create({
      data: createLocalDto,
      select: {
        name: true,
        zipcode: true,
        state: true,
        city: true,
        neighborhood: true,
        streetAddress: true,
        number: true,
      },
    });

  updateLocal = async (updateLocalDto: UpdateLocalDto) => {
    const localUpdateData: UpdateLocalDto = { ...updateLocalDto };
    delete localUpdateData.id;

    return await this.prismaService.local.update({
      data: localUpdateData,
      where: { id: updateLocalDto.id },
      select: {
        name: true,
        zipcode: true,
        state: true,
        city: true,
        neighborhood: true,
        streetAddress: true,
        number: true,
      },
    });
  };

  deleteLocal = async (deleteLocalDto: DeleteLocalDto) =>
    await this.prismaService.local.delete({
      where: deleteLocalDto,
      select: {
        name: true,
        zipcode: true,
        state: true,
        city: true,
        neighborhood: true,
        streetAddress: true,
        number: true,
      },
    });
}

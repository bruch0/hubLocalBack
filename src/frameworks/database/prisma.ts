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

  getUserCompanies = async (getUserCompaniesDto: GetUserCompaniesDto) => {
    const companies = await this.prismaService.company.findMany({
      where: { userId: getUserCompaniesDto.userId, deleted: false },
      select: {
        id: true,
        name: true,
        taxId: true,
        siteUrl: true,
        locals: true,
      },
      take: getUserCompaniesDto.itemsPerPage,
      skip: (getUserCompaniesDto.pageNumber - 1) * getUserCompaniesDto.itemsPerPage,
    });

    const totalCompanies = await this.prismaService.company.count({
      where: { userId: getUserCompaniesDto.userId, deleted: false },
    });

    return { companies, pages: Math.ceil(totalCompanies / getUserCompaniesDto.itemsPerPage) };
  };

  findCompany = async (findCompanyDto: FindCompanyDto) =>
    await this.prismaService.company.findFirst({
      where: { ...findCompanyDto, deleted: false },
    });

  createCompany = async (createCompanyDto: CreateCompanyDto) =>
    await this.prismaService.company.create({
      data: createCompanyDto,
      select: { id: true, name: true, taxId: true, siteUrl: true, locals: true },
    });

  updateCompany = async (updateCompanyDto: UpdateCompanyDto) => {
    const companyUpdateData: UpdateCompanyDto = { ...updateCompanyDto };

    delete companyUpdateData.id;
    delete companyUpdateData.userId;

    return await this.prismaService.company.update({
      data: companyUpdateData,
      where: { id: updateCompanyDto.id },
      select: {
        id: true,
        name: true,
        taxId: true,
        siteUrl: true,
        locals: true,
      },
    });
  };

  deleteCompany = async (deleteCompanyDto: DeleteCompanyDto) =>
    await this.prismaService.company.update({
      data: { deleted: true },
      where: { id: deleteCompanyDto.id },
      select: {
        name: true,
        taxId: true,
        siteUrl: true,
      },
    });

  getCompanyLocals = async (getCompanyLocalsDto: GetCompanyLocalsDto) => {
    const { companyId, userId, itemsPerPage, pageNumber } = getCompanyLocalsDto;

    const locals = await this.prismaService.local.findMany({
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
      take: itemsPerPage,
      skip: (pageNumber - 1) * itemsPerPage,
    });

    const totalLocals = await this.prismaService.local.count({
      where: { company: { id: companyId, userId: userId }, deleted: false },
    });

    return { locals, pages: Math.ceil(totalLocals / itemsPerPage) };
  };

  findLocal = async (findLocalDto: FindLocalDto) =>
    await this.prismaService.local.findFirst({
      where: { ...findLocalDto, deleted: false },
      select: {
        name: true,
        zipcode: true,
        state: true,
        city: true,
        neighborhood: true,
        streetAddress: true,
        number: true,
        company: { select: { userId: true } },
      },
    });

  createLocal = async (createLocalDto: CreateLocalDto) => {
    return await this.prismaService.local.create({
      data: {
        name: createLocalDto.name,
        zipcode: createLocalDto.zipcode,
        state: createLocalDto.state,
        city: createLocalDto.city,
        neighborhood: createLocalDto.neighborhood,
        streetAddress: createLocalDto.streetAddress,
        number: createLocalDto.number,
        company: { connect: { id: createLocalDto.companyId } },
      },
      select: {
        name: true,
        zipcode: true,
        state: true,
        city: true,
        neighborhood: true,
        streetAddress: true,
        number: true,
        company: { select: { userId: true } },
      },
    });
  };

  updateLocal = async (updateLocalDto: UpdateLocalDto) => {
    const localUpdateData: UpdateLocalDto = { ...updateLocalDto };

    delete localUpdateData.id;
    delete localUpdateData.userId;

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
      where: { id: deleteLocalDto.id },
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

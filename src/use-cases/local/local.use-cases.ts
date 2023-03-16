import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '@database/prisma';

import { ResponseLocal } from '@entities';

import { CreateLocalDto, DeleteLocalDto, GetCompanyLocalsDto, UpdateLocalDto } from '@dtos';

import { LocalFactoryService } from './local.use-cases.factory';

@Injectable()
export class LocalUseCases {
  constructor(
    private databaseService: DatabaseService,
    private localFactoryService: LocalFactoryService,
  ) {}

  async getCompanyLocals(getCompanyLocalsDto: GetCompanyLocalsDto): Promise<ResponseLocal[]> {
    return this.databaseService.getCompanyLocals(getCompanyLocalsDto);
  }

  async createLocal(createLocalDto: CreateLocalDto): Promise<ResponseLocal> {
    const newLocal = this.localFactoryService.createLocal(createLocalDto);

    const validCompany = await this.databaseService.findCompany({
      id: newLocal.companyId,
    });
    if (!validCompany) throw new NotFoundException('Empresa não existe');

    return await this.databaseService.createLocal(newLocal);
  }

  async updateLocal(updateLocalDto: UpdateLocalDto): Promise<ResponseLocal> {
    const local = this.localFactoryService.updateLocal(updateLocalDto);

    const validLocal = await this.databaseService.findLocal({
      id: local.id,
    });

    if (!validLocal) throw new NotFoundException('Local não existente');

    if (validLocal.company.userId !== local.userId)
      throw new ForbiddenException('Você não tem autorização para essa ação');

    return await this.databaseService.updateLocal(local);
  }

  async deleteLocal(deleteLocalDto: DeleteLocalDto): Promise<ResponseLocal> {
    const local = this.localFactoryService.deleteLocal(deleteLocalDto);

    const validLocal = await this.databaseService.findLocal({
      id: local.id,
    });
    if (!validLocal) throw new NotFoundException('Local não existente');

    if (validLocal.company.userId !== local.userId)
      throw new ForbiddenException('Você não tem autorização para essa ação');

    return await this.databaseService.deleteLocal(local);
  }
}

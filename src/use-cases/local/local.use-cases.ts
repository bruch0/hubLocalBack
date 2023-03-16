import { Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '@database/prisma';

import { ResponseLocal } from '@entities';

import { CreateLocalDto, DeleteLocalDto, UpdateLocalDto } from '@dtos';

import { LocalFactoryService } from './local.use-cases.factory';

@Injectable()
export class LocalUseCases {
  constructor(
    private databaseService: DatabaseService,
    private localFactoryService: LocalFactoryService,
  ) {}

  async createLocal(localData: CreateLocalDto): Promise<ResponseLocal> {
    const newLocal = this.localFactoryService.createLocal(localData);

    const validCompany = await this.databaseService.findCompany({
      id: newLocal.companyId,
    });
    if (!validCompany) throw new NotFoundException('Empresa não existe');

    return await this.databaseService.createLocal(newLocal);
  }

  async updateLocal(localData: UpdateLocalDto): Promise<ResponseLocal> {
    const local = this.localFactoryService.updateLocal(localData);

    const validLocal = await this.databaseService.findLocal({
      id: local.id,
    });
    if (!validLocal) throw new NotFoundException('Local não existente');

    return await this.databaseService.updateLocal(local);
  }

  async deleteLocal(localData: DeleteLocalDto): Promise<void> {
    const local = this.localFactoryService.deleteLocal(localData);

    const validLocal = await this.databaseService.findLocal({
      id: local.id,
    });
    if (!validLocal) throw new NotFoundException('Local não existente');

    await this.databaseService.deleteLocal(local);
  }
}

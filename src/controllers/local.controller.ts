import { Controller, Post, Body, Put, Delete } from '@nestjs/common';

import { CreateLocalDto, DeleteLocalDto, UpdateLocalDto } from '@dtos';

import { LocalUseCases } from '@local/local.use-cases';

@Controller('locals')
export class LocalController {
  constructor(private localUseCases: LocalUseCases) {}

  @Post()
  createLocal(@Body() localData: CreateLocalDto) {
    return this.localUseCases.createLocal(localData);
  }

  @Put()
  updateLocal(@Body() localData: UpdateLocalDto) {
    return this.localUseCases.updateLocal(localData);
  }

  @Delete()
  deleteLocal(@Body() localData: DeleteLocalDto) {
    return this.localUseCases.deleteLocal(localData);
  }
}

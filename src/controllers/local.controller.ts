import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Headers,
} from '@nestjs/common';

import { CreateLocalDto, DeleteLocalDto, UpdateLocalDto } from '@dtos';

import { LocalUseCases } from '@local/local.use-cases';

@Controller('locals')
export class LocalController {
  constructor(private localUseCases: LocalUseCases) {}

  @Get('/:companyId')
  getCompanyLocals(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Headers('authorization') authorization: string,
  ) {
    const { userId } = JSON.parse(authorization);

    return this.localUseCases.getCompanyLocals({ companyId, userId });
  }

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

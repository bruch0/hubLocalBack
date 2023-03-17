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
import { ApiResponse, ApiHeader } from '@nestjs/swagger';

import { CreateLocalDto, DeleteLocalDto, UpdateLocalDto } from '@dtos';

import { LocalUseCases } from '@local/local.use-cases';

@Controller('locals')
export class LocalController {
  constructor(private localUseCases: LocalUseCases) {}

  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/:companyId')
  getCompanyLocals(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Headers('authorization') authorization: string,
  ) {
    const { userId } = JSON.parse(authorization);

    return this.localUseCases.getCompanyLocals({ companyId, userId });
  }

  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Post()
  createLocal(@Body() localData: Omit<CreateLocalDto, 'userId'>) {
    return this.localUseCases.createLocal(localData);
  }

  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Put()
  updateLocal(@Body() localData: UpdateLocalDto, @Headers('authorization') authorization: string) {
    const { userId } = JSON.parse(authorization);

    return this.localUseCases.updateLocal({ ...localData, userId });
  }

  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete()
  deleteLocal(
    @Body() localData: Omit<DeleteLocalDto, 'userId'>,
    @Headers('authorization') authorization: string,
  ) {
    const { userId } = JSON.parse(authorization);

    return this.localUseCases.deleteLocal({ ...localData, userId });
  }
}

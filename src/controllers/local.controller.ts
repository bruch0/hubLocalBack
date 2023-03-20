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
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiHeader } from '@nestjs/swagger';

import { CreateLocalDto, DeleteLocalDto, GetCompanyLocalsDto, UpdateLocalDto } from '@dtos';

import { LocalUseCases } from '@local/local.use-cases';

@Controller('locals')
export class LocalController {
  constructor(private localUseCases: LocalUseCases) {}

  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('/:companyId')
  getCompanyLocals(
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage: number,
    @Query('pageNumber', ParseIntPipe) pageNumber: number,
    @Param('companyId', ParseIntPipe) companyId: number,
    @Headers('authorization') authorization: string,
  ) {
    const { userId } = JSON.parse(authorization);

    return this.localUseCases.getCompanyLocals({ itemsPerPage, pageNumber, companyId, userId });
  }

  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Post()
  createLocal(@Body() createLocalDto: Omit<CreateLocalDto, 'userId'>) {
    return this.localUseCases.createLocal(createLocalDto);
  }

  @ApiHeader({ name: 'authorization', required: true, description: 'Bearer token' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Put()
  updateLocal(
    @Body() updateLocalDto: UpdateLocalDto,
    @Headers('authorization') authorization: string,
  ) {
    const { userId } = JSON.parse(authorization);

    return this.localUseCases.updateLocal({ ...updateLocalDto, userId });
  }

  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete()
  deleteLocal(
    @Body() deleteLocalDto: Omit<DeleteLocalDto, 'userId'>,
    @Headers('authorization') authorization: string,
  ) {
    const { userId } = JSON.parse(authorization);

    return this.localUseCases.deleteLocal({ ...deleteLocalDto, userId });
  }
}

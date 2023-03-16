import { Controller, Post, Body, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { CreateUserDto, LoginUserDto } from '@dtos';

import { UserUseCases } from '@user/user.use-cases';

@Controller('users')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Post('/register')
  createUser(@Body() userData: CreateUserDto) {
    return this.userUseCases.createUser(userData);
  }

  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Post('/login')
  loginUser(@Body() userData: LoginUserDto) {
    return this.userUseCases.loginUser(userData);
  }
}

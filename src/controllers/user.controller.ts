import { Controller, Post, Body, Put } from '@nestjs/common';

import { CreateUserDto, LoginUserDto } from '@dtos';

import { UserUseCases } from 'src/use-cases/user/user.use-cases';

@Controller('users')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.userUseCases.createUser(userData);
  }

  @Put()
  updateNote(@Body() userData: LoginUserDto) {
    return this.userUseCases.loginUser(userData);
  }
}

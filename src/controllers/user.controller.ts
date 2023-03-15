import { Controller, Post, Body, Put } from '@nestjs/common';

import { CreateUserDto, LoginUserDto } from '@dtos';

import { UserUseCases } from '@user/user.use-cases';

@Controller('users')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Post('/register')
  createUser(@Body() userData: CreateUserDto) {
    return this.userUseCases.createUser(userData);
  }

  @Post('/login')
  updateNote(@Body() userData: LoginUserDto) {
    return this.userUseCases.loginUser(userData);
  }
}

import { Injectable } from '@nestjs/common';

import { User } from '@entities';

import { CreateUserDto, LoginUserDto } from '@dtos';

@Injectable()
export class UserFactoryService {
  createUser(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto);

    return newUser;
  }

  loginUser(updateUserDto: LoginUserDto) {
    const user = new User(updateUserDto);

    return user;
  }
}

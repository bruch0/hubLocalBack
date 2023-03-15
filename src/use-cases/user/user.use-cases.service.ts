import { Injectable } from '@nestjs/common';

import { User } from '@entities';

import { CreateUserDto, LoginUserDto } from '@dtos';

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();

    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;

    return newUser;
  }

  loginUser(updateCompanyDto: LoginUserDto) {
    const user = new User();

    user.email = updateCompanyDto.email;
    user.password = updateCompanyDto.password;

    return user;
  }
}

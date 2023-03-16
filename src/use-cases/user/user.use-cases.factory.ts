import { Injectable } from '@nestjs/common';

import { User } from '@entities';

import { CreateUserDto, LoginUserDto } from '@dtos';

type CreateUserFactoryReturn = {
  name: string;
  email: string;
  password: string;
};

type LoginUserFactoryReturn = {
  email: string;
  password: string;
};

@Injectable()
export class UserFactoryService {
  createUser(createUserDto: CreateUserDto): CreateUserFactoryReturn {
    const newUser: CreateUserFactoryReturn = new User(createUserDto);

    return newUser;
  }

  loginUser(updateUserDto: LoginUserDto): LoginUserFactoryReturn {
    const user: LoginUserFactoryReturn = new User(updateUserDto);

    return user;
  }
}

import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@database/prisma';
import { EncryptService } from '@encrypt/bcrypt';
import { AuthService } from '@auth/jwt';

import { CreateUserDto, LoginUserDto } from '@dtos';

import { UserFactoryService } from './user.use-cases.service';

@Injectable()
export class UserUseCases {
  constructor(
    private databaseService: DatabaseService,
    private encryptService: EncryptService,
    private authService: AuthService,
    private userFactoryService: UserFactoryService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<void> {
    const newUser = this.userFactoryService.createNewUser(userData);

    newUser.password = this.encryptService.encrypt(newUser.password);

    await this.databaseService.createUser(newUser);
  }

  async loginUser(userLoginData: LoginUserDto): Promise<string> {
    const userData = this.userFactoryService.loginUser(userLoginData);

    const user = await this.databaseService.findUser(userData);

    const passwordMatch = this.encryptService.compare(
      userData.password,
      user.password,
    );

    if (!passwordMatch) throw new Error('Invalid password');

    return this.authService.sign({ email: user.email, id: user.id });
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { DatabaseService } from '@database/prisma';
import { EncryptService } from '@encrypt/bcrypt';
import { AuthService } from '@auth/jwt';

import { CreateUserDto, LoginUserDto } from '@dtos';

import { UserFactoryService } from './user.use-cases.factory';

@Injectable()
export class UserUseCases {
  constructor(
    private databaseService: DatabaseService,
    private encryptService: EncryptService,
    private authService: AuthService,
    private userFactoryService: UserFactoryService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<void> {
    const user = await this.databaseService.findUser({ email: userData.email });
    if (user) throw new ConflictException('Usuário já existente');

    const newUser = this.userFactoryService.createUser(userData);
    newUser.password = this.encryptService.encrypt(newUser.password);

    await this.databaseService.createUser(newUser);
  }

  async loginUser(userLoginData: LoginUserDto): Promise<string> {
    const userData = this.userFactoryService.loginUser(userLoginData);

    const user = await this.databaseService.findUser({ email: userData.email });

    if (!user) throw new NotFoundException('Email não registrado');

    const passwordMatch = this.encryptService.compare(
      userData.password,
      user.password,
    );

    if (!passwordMatch) throw new UnauthorizedException('Senha inválida');

    return this.authService.sign({ email: user.email, id: user.id });
  }
}

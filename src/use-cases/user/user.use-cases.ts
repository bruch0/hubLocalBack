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

import { ResponseUser } from '@entities';

import { UserFactoryService } from './user.use-cases.factory';

@Injectable()
export class UserUseCases {
  constructor(
    private databaseService: DatabaseService,
    private encryptService: EncryptService,
    private authService: AuthService,
    private userFactoryService: UserFactoryService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseUser> {
    const emailIsTaken = await this.databaseService.findUser({ email: createUserDto.email });
    if (emailIsTaken) throw new ConflictException('Email já cadastrado');

    const newUser = this.userFactoryService.createUser(createUserDto);
    newUser.password = this.encryptService.encrypt(newUser.password);

    return await this.databaseService.createUser(newUser);
  }

  async loginUser(LoginUserDto: LoginUserDto): Promise<{ token: string }> {
    const userData = this.userFactoryService.loginUser(LoginUserDto);

    const validUser = await this.databaseService.findUser({ email: userData.email });
    if (!validUser) throw new NotFoundException('Email não registrado');

    const passwordMatch = this.encryptService.compare(userData.password, validUser.password);
    if (!passwordMatch) throw new UnauthorizedException('Senha inválida');

    return { token: this.authService.sign({ userId: validUser.id }) };
  }
}

import { Module } from '@nestjs/common';

import { DatabaseService } from '@database/prisma';
import { EncryptService } from '@encrypt/bcrypt';
import { AuthService } from '@auth/jwt';

import { UserFactoryService } from './user.use-cases.factory';
import { UserUseCases } from './user.use-cases';

@Module({
  providers: [
    DatabaseService,
    EncryptService,
    AuthService,
    UserFactoryService,
    UserUseCases,
  ],
  exports: [UserFactoryService, UserUseCases],
})
export class UserUseCasesModule {}

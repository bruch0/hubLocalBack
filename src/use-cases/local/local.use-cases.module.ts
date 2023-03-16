import { Module } from '@nestjs/common';

import { DatabaseService } from '@database/prisma';

import { LocalFactoryService } from './local.use-cases.factory';
import { LocalUseCases } from './local.use-cases';

@Module({
  providers: [DatabaseService, LocalFactoryService, LocalUseCases],
  exports: [LocalFactoryService, LocalUseCases],
})
export class LocalUseCasesModule {}

import { Module } from '@nestjs/common';

import { DatabaseService } from '@database/prisma';

import { CompanyFactoryService } from './company.use-cases.factory';
import { CompanyUseCases } from './company.use-cases';

@Module({
  providers: [DatabaseService, CompanyFactoryService, CompanyUseCases],
  exports: [CompanyFactoryService, CompanyUseCases],
})
export class CompanyUseCasesModule {}

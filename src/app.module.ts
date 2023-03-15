import { Module } from '@nestjs/common';

import { UserController, CompanyController } from '@controllers';

import { UserUseCasesModule } from '@user/user.use-cases.module';
import { CompanyUseCasesModule } from '@company/company.use-cases.module';

@Module({
  controllers: [UserController, CompanyController],
  imports: [UserUseCasesModule, CompanyUseCasesModule],
})
export class AppModule {}

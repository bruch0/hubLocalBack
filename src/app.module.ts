import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import {
  UserController,
  CompanyController,
  LocalController,
} from '@controllers';

import { AuthMiddleware } from '@middlewares';

import { UserUseCasesModule } from '@user/user.use-cases.module';
import { CompanyUseCasesModule } from '@company/company.use-cases.module';
import { LocalUseCasesModule } from '@local/local.use-cases.module';

@Module({
  controllers: [UserController, CompanyController, LocalController],
  imports: [UserUseCasesModule, CompanyUseCasesModule, LocalUseCasesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CompanyController);
  }
}

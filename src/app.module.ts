import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserController, CompanyController } from '@controllers';

import { AuthMiddleware } from '@middlewares';

import { UserUseCasesModule } from '@user/user.use-cases.module';
import { CompanyUseCasesModule } from '@company/company.use-cases.module';

@Module({
  controllers: [UserController, CompanyController],
  imports: [UserUseCasesModule, CompanyUseCasesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CompanyController);
  }
}

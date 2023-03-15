import { Module } from '@nestjs/common';

import { UserController } from '@controllers';

import { UserUseCasesModule } from 'src/use-cases/user/user.use-cases.module';

@Module({
  imports: [UserUseCasesModule],
  controllers: [UserController],
})
export class AppModule {}

import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';

import { DatabaseService } from '@database/prisma';

import { UserController } from '@controllers';

import { CreateUserDto, LoginUserDto } from '@dtos';

import { UserFactoryService } from '@user/user.use-cases.factory';
import { UserUseCases } from '@user/user.use-cases';

describe('Controller', () => {
  let app: TestingModule;

  const mockedUserUseCases = {
    createUser: () => null,
    loginUser: () => null,
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [DatabaseService, UserFactoryService, UserUseCases],
    })
      .overrideProvider(UserUseCases)
      .useValue(mockedUserUseCases)
      .compile();
  });

  describe('User Controller', () => {
    it('Should call the "createUser" usecase', async () => {
      const controller = app.get(UserController);
      jest.spyOn(mockedUserUseCases, 'createUser');

      const createUserDto: CreateUserDto = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      await controller.createUser(createUserDto);

      expect(mockedUserUseCases.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('Should call the "loginUser" usecase', async () => {
      const controller = app.get(UserController);
      jest.spyOn(mockedUserUseCases, 'loginUser');

      const loginUserDto: LoginUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      await controller.loginUser(loginUserDto);

      expect(mockedUserUseCases.loginUser).toHaveBeenCalledWith(loginUserDto);
    });
  });
});

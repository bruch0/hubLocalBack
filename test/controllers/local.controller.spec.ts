import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';

import { DatabaseService } from '@database/prisma';

import { LocalController } from '@controllers';

import { CreateLocalDto, UpdateLocalDto, DeleteLocalDto } from '@dtos';

import { LocalFactoryService } from '@local/local.use-cases.factory';
import { LocalUseCases } from '@local/local.use-cases';

describe('Controller', () => {
  let app: TestingModule;

  const mockedLocalUseCases = {
    getCompanyLocals: () => null,
    createLocal: () => null,
    updateLocal: () => null,
    deleteLocal: () => null,
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [LocalController],
      providers: [DatabaseService, LocalFactoryService, LocalUseCases],
    })
      .overrideProvider(LocalUseCases)
      .useValue(mockedLocalUseCases)
      .compile();
  });

  describe('Local Controller', () => {
    it('Should call the "getCompanyLocals" usecase', async () => {
      const controller = app.get(LocalController);
      jest.spyOn(mockedLocalUseCases, 'getCompanyLocals');

      const getCompanyLocalsDto = {
        companyId: faker.datatype.number(),
        userId: faker.datatype.number(),
        itemsPerPage: 10,
        pageNumber: 1,
      };

      await controller.getCompanyLocals(
        10,
        1,
        getCompanyLocalsDto.companyId,
        JSON.stringify(getCompanyLocalsDto),
      );

      expect(mockedLocalUseCases.getCompanyLocals).toHaveBeenCalledWith(getCompanyLocalsDto);
    });

    it('Should call the "createLocal" usecase', async () => {
      const controller = app.get(LocalController);
      jest.spyOn(mockedLocalUseCases, 'createLocal');

      const createLocalDto: CreateLocalDto = {
        name: faker.name.findName(),
        zipcode: faker.helpers.regexpStyleStringParse('[00001-99999]-[001-999]'),
        state: faker.address.state(),
        city: faker.address.city(),
        neighborhood: faker.address.county(),
        streetAddress: faker.address.streetAddress(),
        companyId: faker.datatype.number(),
      };

      await controller.createLocal(createLocalDto);

      expect(mockedLocalUseCases.createLocal).toHaveBeenCalledWith(createLocalDto);
    });

    it('Should call the "updateLocal" usecase', async () => {
      const controller = app.get(LocalController);
      jest.spyOn(mockedLocalUseCases, 'updateLocal');

      const updateLocalDto: UpdateLocalDto = {
        id: faker.datatype.number(),
        name: faker.name.findName(),
        zipcode: faker.helpers.regexpStyleStringParse('[00001-99999]-[001-999]'),
        state: faker.address.state(),
        city: faker.address.city(),
        neighborhood: faker.address.county(),
        streetAddress: faker.address.streetAddress(),
        userId: faker.datatype.number(),
      };

      await controller.updateLocal(
        updateLocalDto,
        JSON.stringify({ userId: updateLocalDto.userId }),
      );

      expect(mockedLocalUseCases.updateLocal).toHaveBeenCalledWith(updateLocalDto);
    });

    it('Should call the "deleteLocal" usecase', async () => {
      const controller = app.get(LocalController);
      jest.spyOn(mockedLocalUseCases, 'deleteLocal');

      const deleteLocalDto: DeleteLocalDto = {
        id: faker.datatype.number(),
        userId: 0,
      };

      await controller.deleteLocal(
        deleteLocalDto.id,
        JSON.stringify({ userId: deleteLocalDto.userId }),
      );

      expect(mockedLocalUseCases.deleteLocal).toHaveBeenCalledWith(deleteLocalDto);
    });
  });
});

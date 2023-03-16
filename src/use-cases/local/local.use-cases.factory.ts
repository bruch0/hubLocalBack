import { Injectable } from '@nestjs/common';

import { Local } from '@entities';

import { CreateLocalDto, UpdateLocalDto, DeleteLocalDto } from '@dtos';

@Injectable()
export class LocalFactoryService {
  createLocal(createLocalDto: CreateLocalDto) {
    const newLocal = new Local();

    newLocal.name = createLocalDto.name;
    newLocal.zipcode = createLocalDto.zipcode;
    newLocal.state = createLocalDto.state;
    newLocal.city = createLocalDto.city;
    newLocal.neighborhood = createLocalDto.neighborhood;
    newLocal.streetAddress = createLocalDto.streetAddress;
    newLocal.number = createLocalDto.number;
    newLocal.companyId = createLocalDto.companyId;

    return newLocal;
  }

  updateLocal(updateLocalDto: UpdateLocalDto) {
    const local = new Local();

    local.id = updateLocalDto.localId;
    local.name = updateLocalDto.name;
    local.zipcode = updateLocalDto.zipcode;
    local.state = updateLocalDto.state;
    local.city = updateLocalDto.city;
    local.neighborhood = updateLocalDto.neighborhood;
    local.streetAddress = updateLocalDto.streetAddress;
    local.number = updateLocalDto.number;

    return local;
  }

  deleteLocal(deleteLocalDto: DeleteLocalDto) {
    const local = new Local();

    local.id = deleteLocalDto.localId;

    return local;
  }
}

import { Injectable } from '@nestjs/common';

import { Local } from '@entities';

import { CreateLocalDto, UpdateLocalDto, DeleteLocalDto } from '@dtos';

type CreateLocalFactoryReturn = {
  name: string;
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  streetAddress: string;
  companyId: number;
  number?: number;
};

type UpdateLocalFactoryReturn = {
  id: number;
  name: string;
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  streetAddress: string;
  companyId: number;
  number?: number;
  userId: number;
};

type DeleteLocalFactoryReturn = {
  id: number;
  companyId: number;
  userId: number;
};

@Injectable()
export class LocalFactoryService {
  createLocal(createLocalDto: CreateLocalDto): Omit<CreateLocalFactoryReturn, 'userId'> {
    const newLocal: Omit<CreateLocalFactoryReturn, 'userId'> = new Local(createLocalDto);

    return newLocal;
  }

  updateLocal(updateLocalDto: UpdateLocalDto): UpdateLocalFactoryReturn {
    const local: UpdateLocalFactoryReturn = new Local(updateLocalDto);

    return local;
  }

  deleteLocal(deleteLocalDto: DeleteLocalDto): DeleteLocalFactoryReturn {
    const local: DeleteLocalFactoryReturn = new Local(deleteLocalDto);

    return local;
  }
}

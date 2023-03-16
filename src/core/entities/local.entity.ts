type LocalDto = {
  id?: number;
  name?: string;
  zipcode?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  streetAddress?: string;
  companyId?: number;
  number?: number;
  userId?: number;
};

export class Local {
  constructor(localDto: LocalDto) {
    this.id = localDto.id;
    this.name = localDto.name;
    this.zipcode = localDto.zipcode;
    this.state = localDto.state;
    this.city = localDto.city;
    this.neighborhood = localDto.neighborhood;
    this.streetAddress = localDto.streetAddress;
    this.companyId = localDto.companyId;
    this.number = localDto.number;
    this.userId = localDto.userId;
  }

  id: number;
  name: string;
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  streetAddress: string;
  companyId: number;
  deleted: boolean;
  number?: number;
  userId: number;
}

export class ResponseLocal {
  name: string;
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  streetAddress: string;
  number?: number;
}

export class Local {
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

export class Company {
  id: number;
  name: string;
  siteUrl: string;
  taxId: string;
  userId: number;
  deleted: boolean;
}

export class ResponseCompany {
  name: string;
  siteUrl: string;
  taxId: string;
}

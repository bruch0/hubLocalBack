export class GenericEncrypter {
  encrypt: (data: string) => string;
  compare: (data: string, hashData: string) => boolean;
}

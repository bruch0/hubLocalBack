export class GenericAuthProvider {
  sign: (payload: string | { [key: string]: string | number }) => string;
  verify: (data: string) => string | { [key: string]: string | number };
}

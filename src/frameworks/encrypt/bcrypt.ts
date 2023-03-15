import * as bcrypt from 'bcrypt';

import { GenericEncrypter } from '@data-service';

export class EncryptService implements GenericEncrypter {
  encrypt = (data: string) => bcrypt.hashSync(data, 12);

  compare = (data: string, hashData: string) =>
    bcrypt.compareSync(data, hashData);
}

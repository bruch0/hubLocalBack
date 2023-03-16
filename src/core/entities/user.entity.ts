type UserDto = {
  name?: string;
  email?: string;
  password?: string;
};

export class User {
  constructor(createUserDto: UserDto) {
    this.name = createUserDto.name;
    this.email = createUserDto.email;
    this.password = createUserDto.password;
  }

  id: number;
  name: string;
  email: string;
  password: string;
}

export class ResponseUser {
  email: string;
}

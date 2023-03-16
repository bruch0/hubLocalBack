type UserDto = {
  name?: string;
  email?: string;
  password?: string;
};

export class User {
  constructor(userDto: UserDto) {
    this.name = userDto.name;
    this.email = userDto.email;
    this.password = userDto.password;
  }

  id: number;
  name: string;
  email: string;
  password: string;
}

export class ResponseUser {
  email: string;
}

import { IUserResponse } from "../types/user.types";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;

  constructor(data: IUserResponse) {
    this.id = data.id;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.avatar = data.avatar;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get initials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  }

  toJSON() {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
    };
  }

  static fromResponse(data: IUserResponse): User {
    return new User(data);
  }
}

import { IUserResponse } from "../types/user.types";

export class User {
  username: string;
  firstName: string;
  lastName: string;

  constructor(data: IUserResponse) {
    this.username = data.username;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
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
    };
  }

  static fromResponse(data: IUserResponse): User {
    return new User(data);
  }
}

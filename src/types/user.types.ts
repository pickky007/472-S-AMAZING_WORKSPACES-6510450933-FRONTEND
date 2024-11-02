export interface IUserResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface IUserCreate {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
export interface IUserResponse {
  id: number;
  first_name: string;
  last_name: string;
}

export interface IUserCreate {
  first_name: string;
  last_name: string;
  password: string;
}
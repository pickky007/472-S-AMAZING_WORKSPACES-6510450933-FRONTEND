import axios from '../apis/axios';
import { ENDPOINTS } from '../apis/endpoints';
import { User } from '../models/User';
import { IUserCreate, IUserResponse } from '../types/user.types';

export class UserService {
  static async getUser(id: number): Promise<User> {
    try {
      const response = await axios.get<IUserResponse>(ENDPOINTS.USER.GET(id));
      return User.fromResponse(response.data);
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }

  static async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get<IUserResponse[]>(ENDPOINTS.USER.LIST);
      return response.data.map(user => User.fromResponse(user));
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  static async createUser(userData: IUserCreate): Promise<User> {
    try {
      const response = await axios.post<IUserResponse>(
        ENDPOINTS.USER.CREATE,
        userData
      );
      return User.fromResponse(response.data);
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  static async updateUser(id: number, user: User): Promise<User> {
    try {
      const response = await axios.put<IUserResponse>(
        ENDPOINTS.USER.UPDATE(id),
        user.toJSON()
      );
      return User.fromResponse(response.data);
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  static async deleteUser(id: number): Promise<void> {
    try {
      await axios.delete(ENDPOINTS.USER.DELETE(id));
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}
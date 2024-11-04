import axios from '../apis/axios';
import { ENDPOINTS } from '../apis/endpoints';
import { User } from '../models/User';
import { IUserCreate, IUserResponse } from '../types/user.types';

export class UserService {
  static async getUser(id: number): Promise<User> {
    try {
      const response = await axios.get<IUserResponse>(ENDPOINTS.USER.GET(id), {
        withCredentials: true,
      });
      return User.fromResponse(response.data);
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }

  static async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get<IUserResponse[]>(ENDPOINTS.USER.LIST, {
        withCredentials: true,
      });
      return response.data.map((user) => User.fromResponse(user));
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  static async createUser(userData: IUserCreate): Promise<User> {
    try {
      const response = await axios.post<IUserResponse>(
        ENDPOINTS.USER.CREATE,
        userData,
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
        user.toJSON(),
        {
          withCredentials: true,
        },
      );
      return User.fromResponse(response.data);
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  static async deleteUser(id: number): Promise<void> {
    try {
      await axios.delete(ENDPOINTS.USER.DELETE(id), {
        withCredentials: true,
      });
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }

  static async login(username: string, password: string): Promise<any> {
    try {
      await axios.post(
        ENDPOINTS.USER.LOGIN,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      throw new Error('Failed to login');
    }
  }

  static async register(user: IUserCreate): Promise<any> {
    try {
      await axios.post(ENDPOINTS.USER.REGISTER, user);
    } catch (error) {
      throw new Error('Failed to login');
    }
  }
}

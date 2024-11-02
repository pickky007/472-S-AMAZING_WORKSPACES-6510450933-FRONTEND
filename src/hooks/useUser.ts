import { useState, useEffect } from "react";
import { User } from "../models/User";
import { IUserResponse } from "../types/user.types";

export function useUser(id: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fetch user only if loading is true
    if (loading) {
      // Simulated hardcoded user data
      const hardcodedUserData: IUserResponse = {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        avatar: "https://example.com/avatar.jpg",
      };
      // Simulate a delay to mimic fetching data
      setTimeout(() => {
        setUser(User.fromResponse(hardcodedUserData));
        setLoading(false);
      }, 1000); // 1 second delay
    }
  }, [id, loading]);

  async function updateUser(updatedUser: User) {
    if (!user) return;

    setLoading(true);
    try {
      // Simulate updating user
      const updatedUserData: IUserResponse = {
        id: user.id,
        first_name: updatedUser.firstName,
        last_name: updatedUser.lastName,
        email: updatedUser.email,
        avatar: user.avatar, // หรือคุณสามารถใช้ updatedUser.avatar ถ้าต้องการให้สามารถอัปเดต avatar ได้
      };

      // Create new User instance
      setUser(new User(updatedUserData));
      setError(null);
      return updatedUserData;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser() {
    if (!user) return;

    setLoading(true);
    try {
      // Simulate deleting user
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    loading,
    error,
    updateUser,
    deleteUser,
    refetch: () => setLoading(true), // Refetch method to reset loading state
  };
}

// import { useState, useEffect } from 'react';
// import { User } from '../models/User';
// import { UserService } from '../services/userService';

// export const useUser = (id: number) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     fetchUser();
//   }, [id]);

//   const fetchUser = async () => {
//     try {
//       setLoading(true);
//       const data = await UserService.getUser(id);
//       setUser(data);
//       setError(null);
//     } catch (err) {
//       setError(err as Error);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUser = async (updatedUser: User) => {
//     if (!user) return;

//     setLoading(true);
//     try {
//       const data = await UserService.updateUser(user.id, updatedUser);
//       setUser(data);
//       setError(null);
//       return data;
//     } catch (err) {
//       setError(err as Error);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteUser = async () => {
//     if (!user) return;

//     setLoading(true);
//     try {
//       await UserService.deleteUser(user.id);
//       setUser(null);
//       setError(null);
//     } catch (err) {
//       setError(err as Error);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     user,
//     loading,
//     error,
//     updateUser,
//     deleteUser,
//     refetch: fetchUser
//   };
// };

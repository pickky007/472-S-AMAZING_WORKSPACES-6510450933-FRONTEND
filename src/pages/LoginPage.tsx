import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { UserService } from "../services/userService";
import { User } from "../models/User";

interface LoginPageProps {
  setIsAuthenticated?: (b: boolean) => void;
}

export function LoginPage({ setIsAuthenticated = () => {} }: LoginPageProps) {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  function handleSignIn() {
    setIsAuthenticated(true);

    navigate("/");
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const data = await UserService.getUsers();
      setUsers(data);
      console.log("Fetched Users:", data); // ดูค่าที่ถูกตั้งใหม่
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#CDF3F5] to-[#448386]">
      <div className="flex flex-col items-center w-96 h-120 bg-[#F9F6F2] rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-5xl text-[#323232] mb-1">AWS</h1>
          <h2 className="text-2xl text-[#323232]">Login</h2>
        </div>

        <div className="flex flex-col items-center mb-6 space-y-4">
          <div className="h-[2px] w-full bg-gradient-to-r from-[#CDF3F5] to-[#448386]"></div>
          <TextField
            id="textfield-custom"
            label="Username"
            sx={{ width: 300 }}
            size="small"
          />
          <TextField
            id="password-custom"
            label="Password"
            sx={{ width: 300 }}
            size="small"
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Button
            variant="contained"
            onClick={() => {}}
            sx={{
              backgroundColor: "#448386",
              color: "white",
              width: "300px",
              "&:hover": { backgroundColor: "#9ABCA9" },
            }}
          >
            Sign in
          </Button>
          <div className="flex justify-between w-80">
            <p>You don&apos;t have an account?</p>
            <a href="/register" className="text-[#448386]">
              Create account.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button, TextField } from "@mui/material";

import React from "react";

export function RegisterPage() {
  function handleRegisterClick() {
    console.log("Hello World");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#CDF3F5] to-[#448386]">
      <div className="flex flex-col items-center w-96 h-120 bg-[#F9F6F2] rounded-lg shadow-md p-8">
        <h1 className="text-3xl text-[#323232] mb-4">Register</h1>

        <div className="flex flex-col items-center mb-6 space-y-4">
          <div className="h-[2px] w-full bg-gradient-to-r from-[#CDF3F5] to-[#448386]"></div>
          <TextField id="first-name-text-field" label="First Name" />
          <TextField id="last-name-text-field" label="Last Name" />
          <TextField id="password-text-field" label="Password" />
          <TextField id="confirm-password-text-field" label="Password Again" />
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
            Register
          </Button>
          <div className="flex justify-between w-80">
            <p>Already have an account?</p>
            <a href="/" className="text-[#448386]">
              Log in.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

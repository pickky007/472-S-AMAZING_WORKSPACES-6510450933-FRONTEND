import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { PasswordField } from '../components/PasswordField';
import React from 'react';
import { IUserCreate } from '../types/user.types';
import { UserService } from '../services/userService';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLastName(event.target.value);
  }

  function handlePasswordChange(newValue: string) {
    setPassword(newValue);
  }

  function handleConfirmPasswordChange(newValue: string) {
    setConfirmPassword(newValue);
  }

  async function handleRegisterClick() {
    let userRegis: IUserCreate = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      password: password,
    };

    try {
      await UserService.register(userRegis);
      navigate('/'); // Navigate to home on success
    } catch (err) {
      alert('Registration failed: ' + JSON.stringify(err));
    }
  }

  return (
    <div className="flex flex-col  items-center justify-center h-screen bg-gradient-to-r from-[#CDF3F5] to-[#448386]">
      <div className="flex flex-col items-center justify-between w-96 p-8 bg-[#F9F6F2] rounded-lg shadow-lg pt-8">
        <div className="flex flex-col items-center justify-between w-full h-16 mb-2">
          <h1 className="text-2xl font-bold text-[#323232]">Register</h1>
          <div className="bg-gradient-to-r from-[#CDF3F5] to-[#448386] h-0.5 w-72"></div>
        </div>

        <div className="flex flex-col items-center justify-between h-72">
          <TextField
            id="username-text-field"
            label="Username"
            sx={{ width: 300 }}
            size="small"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            id="first-name-text-field"
            label="First name"
            sx={{ width: 300 }}
            size="small"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            id="last-name-text-field"
            label="Last name"
            sx={{ width: 300 }}
            size="small"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <PasswordField
            label="Password"
            width={300}
            onChange={handlePasswordChange}
            value={password}
          />
          <PasswordField
            label="Confirm Password"
            width={300}
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
          />
        </div>
        <div className="flex flex-col items-center justify-between w-full mt-2 ">
          <Button
            variant="contained"
            onClick={handleRegisterClick}
            sx={{
              backgroundColor: '#448386',
              color: 'white',
              width: '300px',
              '&:hover': { backgroundColor: '#9ABCA9' },
            }}
          >
            Register
          </Button>
          <div className="flex flex-row w-60 justify-between mt-4">
            <p>Already have an account?</p>
            <a className="text-[#448386] hover:text-[#384638]" href="/">
              Log in.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

import React from "react";
import "./LoginPage.css";
import { Button, TextField } from "@mui/material";
import { PasswordField } from '../components/common/PasswordField';
import { useState } from 'react';

interface LoginPageProps {
  setIsAuthenticated?: (b: boolean) => void;
}

export function LoginPage({ setIsAuthenticated = () => {} }: LoginPageProps) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      };

      const handlePasswordChange = (newValue: string) => {
        setPassword(newValue);

    };

    function handleSignIn() {
        setIsAuthenticated(true);
        navigate('/');
    }

    return (
        <div className="login">
            <div className="login-card">
                <div className='inner-box1'>
                    <h1 className='heading'>AWS</h1>
                    <h2 className='heading2'>Login</h2>
                    <div className='line'></div>
                </div>
                <div className="inner-box2">
                    <TextField id="textfield-custom " label="Username" sx={{ width: 300 }} size='small' onChange={handleUsernameChange} value={username}/>
                    <PasswordField label="Password" width={300} onChange={handlePasswordChange} value={password} />
                </div>
                <div className="inner-box3">
                    <Button variant="contained" onClick={handleSignIn}
                        sx={{ backgroundColor: '#448386', color: 'white', width: '300px', '&:hover': { backgroundColor: '#9ABCA9' } }}>
                        Sign in
                    </Button>
                    <div className='row-box'>
                        <p>You don't have an account ?</p>
                        <a className='hyper-text' href='/register'>Create account.</a>
                    </div>
                </div>
            </div>

        </div>

  );
}

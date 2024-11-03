import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React from 'react';

interface PasswordFieldProps {
    
    label: string;
    value: string;
    width: number;
    onChange: (value: string) => void;

}

export function PasswordField({ label, value, width,onChange }: PasswordFieldProps) {

    const [showPassword, setShowPassword] = useState(false);

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    };

    function handleMouseDownPassword (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    };

    function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value);
    };

    return (
        <div className="w-full">
    <TextField
        size="small"
        label={label}
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        className={`w-[300px] rounded-lg focus-within:border-blue-600`}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            ),
        }}
    />
</div>

    );
}
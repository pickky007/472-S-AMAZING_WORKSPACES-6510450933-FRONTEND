import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './PasswordField.module.css';

interface PasswordFieldProps {
    
    label: string;
    value: string;
    width: number;
    onChange: (value: string) => void;

}

export function PasswordField({ label, value, width,onChange }: PasswordFieldProps) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={styles.passwordField}>

            <TextField
                size='small'
                label={label}
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={handleChange}
                sx={{width:{width}}}
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
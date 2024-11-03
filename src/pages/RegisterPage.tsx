import { Button, TextField } from "@mui/material";
import styles from "./RegisterPage.module.css"
import { useState } from "react";
import { PasswordField } from "../components/common/PasswordField";


export function RegisterPage() {
 
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      };
    
      const handleFirsrNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
      };
      const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
      };

      const handlePasswordChange = (newValue: string) => {
        setPassword(newValue);

    };

      const handleConfirmPasswordChange = (newValue: string) => {
        setConfirmPassword(newValue);
      };

    function handleRegisterClick() {
        console.log("Hello World")
    }

  return (
            <div className={styles.registerFields}>
                <div className={styles.box1}>
                    <h1 className={styles.heading2}>Register</h1>
                    <div className={styles.line}></div>
                </div>
            
                <div className={styles.box2}>
                    <TextField id="username-text-field" label="Username" sx={{ width: 300 }} size='small' value={username} onChange={handleUsernameChange}/>
                    <TextField id="first-name-text-field" label="First name" sx={{ width: 300 }} size='small' value={firstName}  onChange={handleFirsrNameChange}/>
                    <TextField id="last-name-text-field" label="Last name" sx={{ width: 300 }} size='small' value={lastName} onChange={handleLastnameChange} />
                    <PasswordField label="Password" width={300} onChange={handlePasswordChange} value={password} />
                    <PasswordField label="Confirm Password" width={300} onChange={handleConfirmPasswordChange} value={confirmPassword} />
                   

                </div>
                <div>{username}</div>

                <div className={styles.box3}>
                    <Button variant="contained" onClick={handleRegisterClick}
                        sx={{ backgroundColor: '#448386', color: 'white', width: '300px', '&:hover': { backgroundColor: '#9ABCA9' } }}>
                        Register
                    </Button>
                    <div className={styles.rowBox}>
                        <p>Already have an account ?</p>
                        <a className={styles.hyperText} href='/'>Log in.</a>
                    </div>
                </div>

            </div>
        
  );
}

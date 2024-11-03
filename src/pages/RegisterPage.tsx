import { Button, TextField } from "@mui/material";

import React from "react";
import styles from "./RegisterPage.module.css";

export function RegisterPage() {
  function handleRegisterClick() {
    console.log("Hello World");
  }

  return (
    <div className={styles.register}>
      <div className={styles.registerFields}>
        <h1>Register</h1>

        <div className={styles.box2}>
          <div className={styles.line}></div>

          <TextField id="first-name-text-field" label="First Name"></TextField>
          <TextField id="last-name-text-field" label="Last Name"></TextField>
          <TextField
            id="password-text-field"
            label="Password"
            hiddenLabel
          ></TextField>
          <TextField
            id="confirm-password-text-field"
            label="Password Again"
            hidden
          ></TextField>
        </div>

        <div className={styles.box3}>
          <Button
            variant="contained"
            onClick={handleRegisterClick}
            sx={{
              backgroundColor: "#448386",
              color: "white",
              width: "300px",
              "&:hover": { backgroundColor: "#9ABCA9" },
            }}
          >
            Register
          </Button>
          <div className={styles.rowBox}>
            <p>Already have an account ?</p>
            <a href="/">Log in.</a>
          </div>
        </div>
      </div>
    </div>
  );
}

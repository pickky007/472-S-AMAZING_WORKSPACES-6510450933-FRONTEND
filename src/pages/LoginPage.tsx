import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import { Button, TextField } from "@mui/material";

export function LoginPage() {

    const navigate = useNavigate();

    function handleRegisterClick() {
        navigate('/register');
    }

    return (
        <div className="login">
            <div className="login-card">
                <div className='inner-box1'>
                    <h1>AWS</h1>
                    <h2>Login</h2>
                </div>

                <div className="inner-box2">
                    <div className='line'></div>
                    <TextField id="textfield-custom " label="Username" sx={{ width: 300 }} size='small' />
                    <TextField id="password-custom " label="Password" sx={{ width: 300 }} size='small' />
                </div>
                <div className="inner-box3">
                    <Button variant="contained"
                        sx={{ backgroundColor: '#448386', color: 'white', width: '300px', '&:hover': { backgroundColor: '#9ABCA9' } }}>
                        Sign in
                    </Button>
                    <div className='row-box'>
                        <p>You don't have an account ?</p>
                        <a href='/register'>Create account.</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
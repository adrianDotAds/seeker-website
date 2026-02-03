import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

// Import assets and styles
import logo from '../assets/logo.png';

// URLS
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://10.10.20.198:8085';


function LoginSignupContainer() {

    const [isLogin, setIsLogin] = useState(true);
    const toggleForm = () => {
        setIsLogin(!isLogin);
    }

    return (
        <>
        <div className="login-signup-wrapper">
            <img src={logo} alt="Seeker 2.Q Logo" className="logo" />
            <div className="login-signup-container">
                {isLogin ? <LoginForm onSwitch={toggleForm} /> : <SignupForm onSwitch={toggleForm} />}
            </div>
        </div>
                
        </>
    );
}

function LoginForm({onSwitch}: {onSwitch: () => void}) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [seekerId, setSeekerId] = useState('');
    const [wrongCredentials, setWrongCredentials] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Extracting data from the form elements
            const formData = new FormData(e.currentTarget);
            const payload = Object.fromEntries(formData.entries());
            console.log('Login payload:', payload);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/login`, payload,
                { withCredentials: true }
            )
            if (response.status !== 200) {
                throw new Error('Login failed');
            }
            else {
                console.log('Login successful:', response.data);
                console.log('Get cookies after login:', response.data['access_token']);
                navigate("/dashboard");
                console.log('Redirecting to dashboard...');
            }

        } catch (error) {
            console.error('Login failed:', error);
            setWrongCredentials(true);
        }
    };

    return (
        <form className="login-form form" onSubmit={handleLogin}>
            <h2>SEEKER AUTHENTICATION</h2>
            <input type="text" name="email" placeholder="EMAIL" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="PASSWORD" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" name="seeker_id" placeholder="SEEKER ID" onChange={(e) => setSeekerId(e.target.value)} />
            <button type="submit">LOG IN</button>
            <div className="form-ext-container">
                {wrongCredentials && <p className="error-message">Wrong credentials, please try again.</p>}
                <h3 className="form-ext">NOT A MEMBER YET?</h3>
                <a className="form-ext" onClick={(e) => { e.preventDefault(); onSwitch(); }}><h3 className="sign-up form-ext">I WANT TO BECOME A SEEKER</h3></a>
            </div>
        </form>
    );
}

function SignupForm({onSwitch}: {onSwitch: () => void}) {
    return (
        <form className="signup-form form">
            <h2>SEEKER REGISTRATION</h2>
            <div className="name-inputs">
                <input type="text" name="fname" placeholder="FIRST NAME" />
                <input type="text" name="lname" placeholder="LAST NAME" />
            </div>
            <input type="text" name="email" placeholder="EMAIL" />
            <input type="password" name="password" placeholder="PASSWORD" />
            <input type="text" name="seeker_id" placeholder="SEEKER ID" />
            <button type="submit">Signup</button>
            <div className="form-ext-container">
                <h3 className="form-ext">ALREADY A SEEKER?</h3>
                <a className="form-ext" onClick={(e) => { e.preventDefault(); onSwitch(); }}><h3 className="sign-up form-ext">LOG IN HERE</h3></a>
            </div>
        </form>
    );
}

export default LoginSignupContainer;
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Import assets and styles
import logo from '../assets/logo.png';
import styles from './LoginSignup.module.css';

// URLS
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://10.10.20.198:8085/api';

function LoginSignupContainer() {
    // Initial viewport width
    // const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    // console.log(windowSize);
    // // Update viewport when resized
    // useEffect(() => {
    //     const handleResize = () => {
    //         // Force re-render on resize to apply responsive styles
    //         setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    //         console.log('Window resized:', window.innerWidth, window.innerHeight);
    //     };
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    const [isLogin, setIsLogin] = useState(true);
    const toggleForm = () => {
        setIsLogin(!isLogin);
    }

    return (
        <>
        <div className={styles.loginSignupWrapper}>
            <img src={logo} alt="Seeker 2.Q Logo" className="logo" />
            <div className={styles.loginSignupContainer}>
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
    console.log(email, password, seekerId);

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
        <form className={styles.form} onSubmit={handleLogin}>
            <h2 className={styles.h2}>SEEKER AUTHENTICATION</h2>
            <input type="text" name="email" placeholder="EMAIL" className={styles.inputStyle} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="PASSWORD" className={styles.inputStyle} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" name="seeker_id" placeholder="SEEKER ID" className={styles.inputStyle} onChange={(e) => setSeekerId(e.target.value)} />
            <button className={styles.buttonSubmit} type="submit">LOG IN</button>
            <div className={styles.formExtContainer}>
                {wrongCredentials && <p className={styles.errorMessage}>Wrong credentials, please try again.</p>}
                <h3 className={styles.formExt}>NOT A MEMBER YET?</h3>
                <a className={styles.formExt} onClick={(e) => { e.preventDefault(); onSwitch(); }}><h3 className={styles.signUp}>I WANT TO BECOME A SEEKER</h3></a>
            </div>
        </form>
    );
}

function SignupForm({onSwitch}: {onSwitch: () => void}) {
    const navigate = useNavigate();

    const [wrongCredentials, setWrongCredentials] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [seekerId, setSeekerId] = useState('');
    console.log(email, password, firstName, lastName, seekerId);
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle signup logic here
        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries());
        console.log('Signup payload:', payload);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/signup`, payload,
                { withCredentials: true }
            )
            if (response.status !== 200) {
                throw new Error('Signup failed');
            }
            else {
                console.log('Signup successful:', response.data);
                console.log('Get cookies after signup:', response.data['access_token']);
                navigate("/dashboard");
                console.log('Redirecting to dashboard...');
            }

        } catch (error) {
            console.error('Signup failed:', error);
            setWrongCredentials(true);
        }
    };

    return (
        <form className={styles.signupForm} onSubmit={handleSignUp}>
            <h2 className={styles.h2}>SEEKER REGISTRATION</h2>
            <div className="name-inputs">
                <input type="text" name="fname" placeholder="FIRST NAME" className={styles.inputStyle} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" name="lname" placeholder="LAST NAME" className={styles.inputStyle} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <input type="text" name="email" placeholder="EMAIL" className={styles.inputStyle} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="PASSWORD" className={styles.inputStyle} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" name="seeker_id" placeholder="SEEKER ID" className={styles.inputStyle} onChange={(e) => setSeekerId(e.target.value)} />
            <button className={styles.buttonSubmit} type="submit">Signup</button>
            <div className="form-ext-container">
                <h3 className="form-ext">ALREADY A SEEKER?</h3>
                <a className="form-ext" onClick={(e) => { e.preventDefault(); onSwitch(); }}><h3 className="sign-up form-ext">LOG IN HERE</h3></a>
            </div>
        </form>
    );
}

export default LoginSignupContainer;
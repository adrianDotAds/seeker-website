import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// Import assets and styles
import logo from '../assets/logo.png';

// URLS
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://10.10.20.198:8085/api';

const LoginSignupWrapper: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
//   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background};
};

const LoginSignupContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    width: '25vw',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    border: '25px solid #004AAD',
};

const Form: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: '1rem',
};

const inputStyle: React.CSSProperties = {
    width: '80%',
    padding: '0.5rem',
    paddingLeft: '1rem',
    borderRadius: '0.3rem',
    border: 'none',
    backgroundColor: '#EFF2F8',
    color: 'black',
};

// Mobile responsiveness
if (window.innerWidth && window.innerWidth < 768) {
    LoginSignupContainerStyle.width = '70vw';
    LoginSignupContainerStyle.height = '60vh';
}

function LoginSignupContainer() {
    // Initial viewport width
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    console.log(windowSize);
    // Update viewport when resized
    useEffect(() => {
        const handleResize = () => {
            // Force re-render on resize to apply responsive styles
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isLogin, setIsLogin] = useState(true);
    const toggleForm = () => {
        setIsLogin(!isLogin);
    }

    return (
        <>
        <div className="login-signup-wrapper" style={LoginSignupWrapper}>
            <img src={logo} alt="Seeker 2.Q Logo" className="logo" />
            <div className="login-signup-container" style={LoginSignupContainerStyle}>
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
        <form className="login-form form" style={Form} onSubmit={handleLogin}>
            <h2>SEEKER AUTHENTICATION</h2>
            <input type="text" name="email" placeholder="EMAIL" style={inputStyle} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="PASSWORD" style={inputStyle} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" name="seeker_id" placeholder="SEEKER ID" style={inputStyle} onChange={(e) => setSeekerId(e.target.value)} />
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
        <form className="signup-form form" style={Form}>
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
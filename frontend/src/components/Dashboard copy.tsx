import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import NavBar from './NavBar';
import ContentsContainer from './ContentsContainer';
import { NavBarButtonClick, LogoAndProfileOnly } from './NavBar';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://10.10.20.198:8085/api';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [activeButton, setActiveButton] = useState('LOGO');
    const navigate = useNavigate();
    console.log("Dashboard mounted");

    const activeButtonHandler = (buttonName: string) => {
        setActiveButton(buttonName);
    }

    const userChecker = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/me`, { withCredentials: true });
            console.log("User data fetched:", response.data);
            console.log("User state set:", response.data.user);
        } catch (err) {
            console.error("Error fetching user data", err);
            navigate('/'); // Redirect to login if not authenticated
        }
    };
    useEffect(() => {
        userChecker().finally(() => setLoading(false));
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get(`${API_BASE_URL}/logout`, { withCredentials: true });
            navigate('/');
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    if (loading) return <div>Loading...</div>;

    // Styles
    const dashboardContainerStyle = {
        backgroundColor: '#065c22', //To Delete later
        height: '100%',
        width: '100%',
        // overflow: 'hidden' as const,
        
    };

    const navTopContainerStyle = {
        backgroundColor: 'orange', //To Delete later
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        width: '100%',
        height: '7%',
    };

    const dashboardMainStyle = {
        backgroundColor: 'purple', //To Delete later
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        width: '100%',
        height: '80%',
    };

    const navMenuBottomStyle = {
        backgroundColor: 'blue', //To Delete later
        display: 'flex',
        flexDirection: 'row' as 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '7%',
    };

    return (
        <div className='dashboard-container' style={dashboardContainerStyle}>
            <div className="nav-top-container" style={navTopContainerStyle}>
                 <div className='logo-and-profile-only-container'>
                     <LogoAndProfileOnly />
                 </div>
                 <div className='nav-menu-top'>
                     <NavBar activeButton={activeButton} onButtonClick={activeButtonHandler} />
                 </div>
             </div> 
            <main className="dashboard-main" style={dashboardMainStyle}>
                <ContentsContainer activeButton={activeButton} />
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </main>
            <div className="nav-menu-bottom" style={navMenuBottomStyle}>
                <NavBarButtonClick activeButton={activeButton} onButtonClick={activeButtonHandler} />
            </div>
        </div>
            
    );
};

export default Dashboard;

// const Dashboard = () => {
//     return (
//         <h1>Dashboard - Work in Progress</h1>
//     );
// }

// export default Dashboard;
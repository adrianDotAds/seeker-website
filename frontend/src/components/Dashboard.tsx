import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Styles
import styles from './MainStyle.module.css';

import { ClickableButton } from './NavBar';
import NavBar from './NavBar';
import ContentsContainer from './ContentsContainer';
// import { NavBarButtonClick, LogoAndProfileOnly } from './NavBar';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://10.10.20.198:8085/api';

const Dashboard = () => {
    // Vars for Clickable Button inside Nav
    const [loading, setLoading] = useState(true);
    const [activeButton, setActiveButton] = useState('LOGO');
    const navigate = useNavigate();

    function Main() {
        // Main return function for the dashboard, will contain the main structure of the dashboard and the components that will be rendered in it
        return (
            <div className={styles.dashboardContainer}> {/* 100% height and width of the viewport */}
                <div className={styles.navMenuTop}> {/* 10% height and 100% width of dashboardContainerStyle*/}
                    <NavBar activeButton={activeButton} onButtonClick={activeButtonHandler} handleLogout={handleLogout} />
                </div>
                <main className={styles.dashboardMain}> {/* 80% height and 100% width of dashboardContainerStyle */}
                    <ContentsContainer activeButton={activeButton} />
                </main>
                <div className={styles.navMenuBottom}> {/* 10% height and 100% width of dashboardContainerStyle */}
                    <ClickableButton activeButton={activeButton} onButtonClick={activeButtonHandler} />
                </div>
            </div>
        );
    };

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

    if (loading) return <div style={{ color: 'white' }}>Loading...</div>;

    return (
        Main()   
    );
};

export default Dashboard;

// const Dashboard = () => {
//     return (
//         <h1>Dashboard - Work in Progress</h1>
//     );
// }

// export default Dashboard;
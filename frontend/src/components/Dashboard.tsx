import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ClickableButton } from './NavBar';
import NavBar from './NavBar';
import ContentsContainer from './ContentsContainer';
import { useWindowSize } from './GetDimension';
// import { NavBarButtonClick, LogoAndProfileOnly } from './NavBar';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://10.10.20.198:8085/api';

const Dashboard = () => {
    // Vars for Clickable Button inside Nav
    const [loading, setLoading] = useState(true);
    const [activeButton, setActiveButton] = useState('LOGO');
    const navigate = useNavigate();
    const windowSize = useWindowSize();

    function Main() {
        // Main return function for the dashboard, will contain the main structure of the dashboard and the components that will be rendered in it
        return (
            <div style={dashboardContainerStyle}> {/* 100% height and width of the viewport */}
                <div className='nav-top' style={navMenuTopStyle}> {/* 10% height and 100% width of dashboardContainerStyle*/}
                    <NavBar activeButton={activeButton} onButtonClick={activeButtonHandler} handleLogout={handleLogout} />
                </div>
                <main style={dashboardMainStyle}> {/* 80% height and 100% width of dashboardContainerStyle */}
                    <ContentsContainer activeButton={activeButton} />
                </main>
                <div className='nav-bottom' style={navMenuBottomStyle}> {/* 10% height and 100% width of dashboardContainerStyle */}
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

    if (loading) return <div>Loading...</div>;

    // Styles
    const dashboardContainerStyle: React.CSSProperties = {
        // backgroundColor: '#065c22', //To Delete later
        height: '100%', // Full height of the viewport
        width: '100%', // Full width of the viewport
        // overflow: 'hidden' as const, // To prevent scrolling, can be removed later if needed
    };

    const navMenuTopStyle: React.CSSProperties = {
        // Size
        width: '100%', // Full width of the dashboard
        height: '10%', // 10% of the dashboard height

        // Flex
        display: 'flex',
        flexFlow: 'wrap',
        alignItems: 'center',
        flexDirection: 'row' as const,
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        
        // Colors
        // backgroundColor: 'orange', //To Delete later
        } as const;

    const dashboardMainStyle: React.CSSProperties = {
        // Size
        width: '90%', // Full width of the dashboard
        margin: 'auto', // Center the main content
        height: '85%', // 85% of the dashboard height

        // Flex
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',

        // Colors
        // backgroundColor: 'purple', //To Delete later
    };

    const navMenuBottomStyle: React.CSSProperties = {
        // Size
        width: '100%', // Full width of the dashboard
        height: '5%', // 5% of the dashboard height

        // Flex
        flexDirection: 'row' as 'row',
        justifyContent: 'center',
        alignItems: 'center',

        // Colors
        // backgroundColor: 'blue', //To Delete later
    };

    // Change styles based on window size
    if (windowSize.width && windowSize.width < 768) {
        // Mobile view adjustments
        navMenuBottomStyle.display = 'block' as 'block';
    }

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
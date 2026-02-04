import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://10.10.20.198:8085';

const Dashboard = () => {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    console.log("Dashboard mounted");

    const userChecker = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/me`, { withCredentials: true });
            console.log("User data fetched:", response.data);
            setUser(response.data.user);
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

    return (
        <div className='dashboard-container'>
            <div style={{ padding: '0 0 0 0', margin: '0 0 0 0', fontFamily: 'sans-serif', color: '#ffffff' }}>
                <NavBar />
                <main className="dashboard-main">
                    <h1>Welcome to your Dashboard, {user?.email}!</h1>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </main>
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
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://10.10.20.198:8085'; // Adjust to your FastAPI URL

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
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
                <h2>My Dashboard</h2>
                <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>Logout</button>
            </nav>

            <main style={{ marginTop: '20px' }}>
                <h3>Welcome, {user?.email}!</h3>
                <p>This is a protected area visible only to logged-in users.</p>
                
                <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                    <h4>Current Session Info</h4>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            </main>
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
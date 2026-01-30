import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8085'; // Adjust to your FastAPI URL

const Dashboard = () => {
    // const [user, setUser] = useState<{ email: string } | null>(null);
    // const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     // 1. Ask FastAPI for the current user data
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await axios.get(`${API_BASE_URL}/users/me`, {
    //                 withCredentials: true // Important: sends your cookies back to FastAPI
    //             });
    //             setUser(response.data);
    //         } catch (err) {
    //             console.error("Not authorized", err);
    //             navigate('/login'); // Kick back to login if session is invalid
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchUserData();
    // }, [navigate]);

    // const handleLogout = async () => {
    //     try {
    //         await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    //         navigate('/login');
    //     } catch (err) {
    //         console.error("Logout failed", err);
    //     }
    // };

    // if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Dashboard</h1>
            {/* {user && <p>Welcome, {user.email}!</p>} */}
            {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
    );
};

export default Dashboard;
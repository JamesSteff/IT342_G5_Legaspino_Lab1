import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        window.location.href = "/login";
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Dashboard</h1>
            <p>Welcome! You are securely logged in.</p>
            <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
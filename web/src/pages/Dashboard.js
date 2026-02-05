import React from 'react';

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem("token"); // Invalidate session
        window.location.href = "/login";
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dashboard / Profile Page</h2>
            <p>Welcome!</p>
            <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>
                Logout
            </button>
        </div>
    );
};
export default Dashboard;
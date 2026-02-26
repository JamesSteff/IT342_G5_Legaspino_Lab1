import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [contact, setContact] = useState({ name: '', phone: '' });

    const handleLogout = () => {
        // Clear session token and redirect to login
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        window.location.href = "/login";
    };

    const handleSyncContact = async (e) => {
        e.preventDefault();
        try {
            // Transactional Function: Send contact to backend for Google People API sync
            await axios.post('http://localhost:8080/api/contacts/sync', contact);
            alert("Contact added and synced to your Google Contacts!");
            setContact({ name: '', phone: '' }); // Reset input fields
        } catch (error) {
            console.error("Sync Error:", error);
            alert("Sync failed. Ensure you are logged in via Google.");
        }
    };

    return (
        <div style={{ padding: '30px', maxWidth: '800px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1a73e8', paddingBottom: '10px' }}>
                <h1 style={{ color: '#1a73e8' }}>QuickContacts Dashboard</h1>
                <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    LOGOUT
                </button>
            </div>

            <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f8f9fa' }}>
                <h3>Add Contact to Google</h3>
                <form onSubmit={handleSyncContact} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={contact.name}
                        onChange={(e) => setContact({...contact, name: e.target.value})}
                        required 
                        style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={contact.phone}
                        onChange={(e) => setContact({...contact, phone: e.target.value})}
                        required 
                        style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" style={{ flex: 1, backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        SYNC TO GOOGLE
                    </button>
                </form>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <p>Status: <span style={{ color: 'green', fontWeight: 'bold' }}>Connected to Google Cloud</span></p>
            </div>
        </div>
    );
};

export default Dashboard;
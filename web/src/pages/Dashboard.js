import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // 1. Session and Security Check (UPDATED FOR OAUTH2)
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        /* Technical Note: We comment this out because Google OAuth2 uses 
           Session Cookies (managed by the browser), not localStorage tokens. 
           Keeping this active will cause an infinite redirect loop to /login.
        */
        
        // if (!token) {
        //     navigate("/login");
        // }
    }, [navigate]);

    // 2. Function to trigger Google OAuth2 process
    const handleGoogleSync = () => {
        // Redirects the user to the Spring Boot OAuth2 endpoint
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    // 3. Function to fetch the contacts from the backend after sync
    const fetchGoogleContacts = async () => {
        setLoading(true);
        try {
            // withCredentials: true is CRITICAL to send the session cookie back to Spring Boot
            const response = await axios.get('http://localhost:8080/api/google/contacts', { 
                withCredentials: true 
            });
            setContacts(response.data.connections || []);
        } catch (error) {
            console.error("Sync Error:", error);
            alert("Please authenticate with Google first (Step 1) before loading contacts.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Clear everything to be safe
        localStorage.removeItem("token");
        // Redirect to Spring Boot logout to clear the Google Session too
        window.location.href = "http://localhost:8080/logout";
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>QuickContacts Dashboard</h2>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>

            <div style={styles.actionCard}>
                <h3>Google Integration</h3>
                <p>To view your contacts, please sync your account with the Google People API.</p>
                <div style={styles.buttonGroup}>
                    <button onClick={handleGoogleSync} style={styles.syncBtn}>
                        1. Authenticate with Google
                    </button>
                    <button onClick={fetchGoogleContacts} style={styles.viewBtn}>
                        2. Load Contacts
                    </button>
                </div>
            </div>

            <hr style={styles.divider} />

            <div style={styles.listSection}>
                {loading ? <p>Fetching contacts from Google...</p> : (
                    <ul style={styles.contactList}>
                        {contacts.length > 0 ? (
                            contacts.map((contact, index) => (
                                <li key={index} style={styles.contactItem}>
                                    <div>
                                        <strong style={{display: 'block'}}>{contact.names?.[0]?.displayName || "No Name"}</strong>
                                        <small style={{color: '#666'}}>{contact.emailAddresses?.[0]?.value || "No Email"}</small>
                                    </div>
                                    <span style={styles.statusBadge}>Synced</span>
                                </li>
                            ))
                        ) : (
                            <p style={styles.emptyMsg}>No Google contacts found. Click "Authenticate" then "Load Contacts".</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '40px', maxWidth: '900px', margin: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    title: { color: '#1a73e8', margin: 0 },
    logoutBtn: { padding: '8px 16px', backgroundColor: '#d93025', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    actionCard: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6', marginBottom: '20px' },
    buttonGroup: { display: 'flex', gap: '10px', marginTop: '15px' },
    syncBtn: { padding: '10px 20px', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    viewBtn: { padding: '10px 20px', backgroundColor: '#34a853', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    divider: { margin: '30px 0', border: '0', borderTop: '1px solid #eee' },
    contactList: { listStyle: 'none', padding: 0 },
    contactItem: { padding: '15px', backgroundColor: 'white', border: '1px solid #eee', marginBottom: '10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    statusBadge: { fontSize: '12px', backgroundColor: '#e6f4ea', color: '#1e8e3e', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' },
    emptyMsg: { textAlign: 'center', color: '#777', marginTop: '40px' }
};

export default Dashboard;
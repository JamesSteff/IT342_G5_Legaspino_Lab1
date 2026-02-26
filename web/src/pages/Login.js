import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Redirects user to Spring Boot backend to initiate Google OAuth2 flow
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Standard login via backend API
            const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
            
            if (response.data === "Login Success!") {
                localStorage.setItem("token", "logged-in-session-token");
                alert("Login Successful!");
                window.location.href = "/dashboard"; 
            } else {
                alert("Invalid Credentials!");
            }
        } catch (error) {
            console.error("Login error", error);
            alert("Error connecting to server.");
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px', marginTop: '100px' }}>
            <h2 style={{ color: '#1a73e8' }}>QuickContacts Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    LOGIN
                </button>
            </form>

            <div style={{ margin: '20px 0', color: '#777' }}>OR</div>

            {/* Button for Google Contacts Integration */}
            <button onClick={handleGoogleLogin} style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', border: '1px solid #dadce0', borderRadius: '5px', backgroundColor: 'white', color: '#3c4043', fontWeight: '500' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="20px" alt="Google Logo" />
                Sign in with Google
            </button>

            <p style={{ marginTop: '20px' }}>Don't have an account? <Link to="/register" style={{ color: '#1a73e8', textDecoration: 'none' }}>Register here</Link></p>
        </div>
    );
};

export default Login;
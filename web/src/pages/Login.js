import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

/**
 * QuickContacts Login Component
 * Handles user authentication and session token storage.
 */
const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    /**
     * Handles the login submission.
     * Matches the JSON response from AuthController.java.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
            
            // Check if backend returned "Login Success" message
            if (response.data.message === "Login Success") {
                // Store the token to bypass the Dashboard security check
                localStorage.setItem("token", response.data.token || "logged-in-session-token");
                
                alert("Login Successful!");
                navigate("/dashboard"); 
            } else {
                alert("Invalid Credentials!");
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
            alert("Login failed. Please check your credentials or if the Spring Boot server is running.");
        }
    };

    const handleGoogleLogin = () => {
        // This is a shortcut to Google OAuth2 if you want to bypass manual login
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>QuickContacts Login</h2>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        onChange={handleChange} 
                        required 
                        style={styles.input} 
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        required 
                        style={styles.input} 
                    />
                </div>
                <button type="submit" style={styles.loginBtn}>
                    LOGIN
                </button>
            </form>

            <div style={styles.dividerContainer}>
                <span style={styles.dividerLine}></span>
                <span style={{ margin: '0 10px', color: '#777' }}>OR</span>
                <span style={styles.dividerLine}></span>
            </div>

            <button onClick={handleGoogleLogin} style={styles.googleBtn}>
                <img 
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                    width="18px" 
                    alt="Google Logo" 
                />
                Sign in with Google
            </button>

            <p style={{ marginTop: '25px', fontSize: '14px' }}>
                Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
            </p>
        </div>
    );
};

// Professional Styles
const styles = {
    container: { 
        padding: '40px', 
        maxWidth: '400px', 
        margin: 'auto', 
        textAlign: 'center', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        borderRadius: '12px', 
        marginTop: '100px', 
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif'
    },
    title: { color: '#1a73e8', marginBottom: '25px' },
    input: { 
        width: '100%', 
        padding: '12px', 
        borderRadius: '5px', 
        border: '1px solid #ddd', 
        boxSizing: 'border-box' 
    },
    loginBtn: { 
        width: '100%', 
        padding: '12px', 
        backgroundColor: '#1a73e8', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer', 
        fontWeight: 'bold', 
        fontSize: '16px' 
    },
    dividerContainer: { 
        margin: '25px 0', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    dividerLine: { borderBottom: '1px solid #ddd', width: '30%' },
    googleBtn: { 
        width: '100%', 
        padding: '10px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '10px', 
        cursor: 'pointer', 
        border: '1px solid #dadce0', 
        borderRadius: '5px', 
        backgroundColor: 'white', 
        color: '#3c4043', 
        fontWeight: '500', 
        fontSize: '14px' 
    },
    link: { color: '#1a73e8', textDecoration: 'none', fontWeight: '600' }
};

export default Login;
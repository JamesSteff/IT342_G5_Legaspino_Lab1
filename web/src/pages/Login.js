import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
            
            localStorage.setItem("token", response.data.token || "logged-in"); 
            alert("Login Success!");
            window.location.href = "/dashboard"; 
        } catch (error) {
            alert("Invalid Credentials!");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br/><br/>
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br/><br/>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
};
export default Login;
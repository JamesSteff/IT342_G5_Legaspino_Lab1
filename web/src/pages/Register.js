import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', user);
            if (response.status === 200 || response.status === 201) {
                alert("Registration Successful!");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("Failed to register. Make sure MySQL is running and database 'it342_lab2' exists.");
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px', marginTop: '100px' }}>
            <h2 style={{ color: '#1a73e8' }}>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1a73e8', color: 'white', border: 'none', cursor: 'pointer' }}>REGISTER</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default Register;
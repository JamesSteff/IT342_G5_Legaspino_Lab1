import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation: Ensure passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Sends user registration data to backend
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            alert(response.data); 
            navigate('/login'); 
        } catch (error) {
            console.error("Registration Error:", error);
            alert("Failed to register. Please check the console for details.");
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px', marginTop: '50px' }}>
            <h2 style={{ color: '#1a73e8' }}>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="password" name="confirmPassword" placeholder="Repeat Password" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    REGISTER
                </button>
            </form>
            <p style={{ marginTop: '20px' }}>Already have an account? <Link to="/login" style={{ color: '#1a73e8', textDecoration: 'none' }}>Login here</Link></p>
        </div>
    );
};

export default Register;
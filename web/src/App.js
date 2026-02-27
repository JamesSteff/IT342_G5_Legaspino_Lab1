import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

/**
 * PrivateRoute Component
 * A wrapper to protect the Dashboard route.
 * Redirects to /login if no authentication token is found in localStorage.
 */
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* * Route 1: Landing Page (The Entry Point)
                  * This displays the introduction and app features.
                */}
                <Route path="/" element={<Home />} />

                {/* * Route 2: Registration Page
                  * For creating new local MySQL accounts.
                */}
                <Route path="/register" element={<Register />} />

                {/* * Route 3: Login Page
                  * For local authentication and obtaining a session token.
                */}
                <Route path="/login" element={<Login />} />
                
                {/* * Route 4: Dashboard (Protected)
                  * Only accessible if the user is logged in.
                  * Contains the Google People API integration logic.
                */}
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                />

                {/* * Fallback Route:
                  * Redirects any undefined URL paths back to the Home page.
                */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
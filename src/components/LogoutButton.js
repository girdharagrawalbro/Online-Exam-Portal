import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication information
        localStorage.removeItem('token'); // Adjust this based on where you store your token
        navigate('/');
        // Reload the page after navigation
        window.location.reload();
    };

    return (
        <button onClick={handleLogout} className="btn btn-sm btn-danger">
            Logout
        </button>
    );
};

export default LogoutButton;

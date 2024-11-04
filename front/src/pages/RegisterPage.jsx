// src/pages/RegisterPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../components/UserContext';
import './RegisterPage.css';

export default function RegisterPage() {
    const [user, setUser] = useState('');
    const nav = useNavigate();
    const { addUser } = useUserContext();

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };

    const handleSubmit = () => {
        const token = "Bearer si"; // Store token as needed
        localStorage.setItem('token', token);
        addUser(user); // Add user to context
        nav('/chat/' + user);
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Sign Up</h1>
            <input
                type="text"
                className="register-input"
                onChange={handleUserChange}
                value={user}
                placeholder="Enter your username"
            />
            <button className="register-button" onClick={handleSubmit}>
                Acceder
            </button>
        </div>
    );
}

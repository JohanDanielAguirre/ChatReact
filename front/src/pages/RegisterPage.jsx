// RegisterPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Importing the CSS file

export default function RegisterPage() {
    const [user, setUser] = useState('');
    const nav = useNavigate();

    const handleUserChange = (event) => {
        setUser(event.target.value);
    }

    const handleSubmit = () => {
        const token = "Bearer si"; // Corrected spelling from "Bareer" to "Bearer"
        localStorage.setItem('token', token);
        nav('/chat/' + user);
    }

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

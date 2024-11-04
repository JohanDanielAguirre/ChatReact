import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [user, setUser] = useState('');
    const nav = useNavigate();

    const handleUserChange = (event) => {
        setUser(event.target.value);
    }
    const handleSubmit = () => {
        const token = "Bareer si"
        localStorage.setItem('token', token);
        nav('/chat/' + user);
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <input type="text" onChange={handleUserChange} value={user} />
            <button onClick={handleSubmit}>Acceder</button>
        </div>
    )
}
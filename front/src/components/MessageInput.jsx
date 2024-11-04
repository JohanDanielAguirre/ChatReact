// src/components/MessageInput.jsx
import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = () => {
        console.log('Mensaje a enviar:', message); // Agrega esto para depuración
        onSendMessage(message);
        setMessage(''); // Limpiar el campo después de enviar
    };

    return (
        <div className="message-input">
            <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="Escribe tu mensaje..."
            />
            <button onClick={handleSubmit}>Enviar</button>
        </div>
    );
};

export default MessageInput;

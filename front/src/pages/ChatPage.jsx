// src/pages/Chat.js
import React, { useEffect, useState } from 'react';
import stompService from '../utils/socketService';
import UserList from '../components/UserList';
import MessageArea from '../components/MessageArea';
import MessageInput from '../components/MessageInput';
import { useUserContext } from '../components/UserContext'; // Importar UserContext
import './Chat.css';
import { useParams } from 'react-router-dom';

const Chat = () => {
    const { users } = useUserContext(); // Obtener usuarios del contexto
    const [selectedUser, setSelectedUser] = useState('');
    const [messages, setMessages] = useState([]); // Correcto // Inicializa como un array
    const { user: sender } = useParams(); // Asegúrate de que se establece el usuario actual

    useEffect(() => {
            stompService.subscribe(`/messageTo/${sender}`, (msg) => {
                setMessages((prevMessages) => [...prevMessages, msg]);
            }).catch((error) => console.error('Error al suscribirse:', error));
        return () => {
            if (selectedUser) {
                stompService.unsubscribe(`/messageTo/${selectedUser}`);
            }
        };
    }, [sender]); // Añade selectedUser como dependencia
    const handleSendMessage = (message) => {
        if (sender && selectedUser && message) {
            const newMessage = { sender, content: "enviaste: " + message};

            // Publicar al usuario seleccionado
            stompService.publish(`/messageTo/${selectedUser}`);
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            // Enviar el mensaje al servidor mediante fetch
            fetch(`http://localhost:8080/chat?to=${selectedUser}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender: sender,
                    time: 0,
                    type: "text",
                    content: "el usuario "+sender+ " envio el siguiente mensaje: "+ message,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Mensaje enviado al servidor:', data);
                })
                .catch((error) => {
                    console.error('Error al enviar el mensaje:', error);
                });
        } else {
            alert('Por favor, selecciona un usuario y escribe un mensaje.');
        }
    };

    return (
        <div className="chat-container">
            <h1 className="chat-title">Chat</h1>
            <UserList users={users} onSelectUser={setSelectedUser} />
            <MessageArea messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default Chat;
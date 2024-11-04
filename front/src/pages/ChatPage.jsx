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
    const [messages, setMessages] = useState([]);
    const { user: sender } = useParams(); // Asegúrate de que se establece el usuario actual
    useEffect(() => {
        if (selectedUser) {
            stompService.subscribe(`/messageTo/${sender}`, (msg) => {
                setMessages((prevMessages) => [...prevMessages, msg]);
            }).catch((error) => console.error('Error al suscribirse:', error));
        }

        return () => {
            if (selectedUser) {
                stompService.unsubscribe(`/messageTo/${sender}`);
            }
        };
    }, [sender]);

    const handleSendMessage = (message) => {
        console.log('Mensaje a enviar:', message); // Agrega esto para depuración
        console.log('Usuario seleccionado:', selectedUser); // Agrega esto para depuración
        console.log('Usuario actual:', sender); // Agrega esto para depuración
        if (sender && selectedUser && message) {
            const newMessage = { sender, text: message };
            stompService.publish(`/sendMessage/${selectedUser}`, newMessage); // Publicar al usuario seleccionado
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessages('');
            fetch('http://localhost:8080/chat?to=${to}', {
            method: "POST",
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: sender,
                to: selectedUser,
                time: Date.now(),
                type: "text",
                content: message,
                credentials: "include",
            }),
        })
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

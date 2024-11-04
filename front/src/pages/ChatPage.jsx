// Chat.js
import React, { useEffect, useState } from 'react';
import stompService from '../utils/socketService';
import UserList from '../components/UserList';
import MessageArea from '../components/MessageArea';
import MessageInput from '../components/MessageInput';
import './Chat.css'; // Importing the CSS file

const Chat = () => {
  const [users, setUsers] = useState([]); // Logic for obtaining connected users can be added here
  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState(''); // Adjust the value according to the current user

  useEffect(() => {
    if (selectedUser) {
      stompService
          .subscribe(`/messageTo/${selectedUser}`, (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
          })
          .catch((error) => console.error('Error al suscribirse:', error));
    }

    return () => {
      if (selectedUser) {
        stompService.unsubscribe(`/messageTo/${selectedUser}`);
      }
    };
  }, [selectedUser]);

  const handleSendMessage = (message) => {
    if (sender && selectedUser && message) {
      const newMessage = { sender, text: message };

      stompService.publish(`/sendMessage/${sender}`, newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
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

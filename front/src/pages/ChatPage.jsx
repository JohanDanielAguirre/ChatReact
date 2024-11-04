// Chat.js
import React, { useEffect, useState } from 'react';
import stompService from '../utils/socketService';
import UserList from '../components/UserList';
import MessageArea from '../components/MessageArea';
import MessageInput from '../components/MessageInput';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { user } = useParams();
  const [users, setUsers] = useState([]); // Agrega aquí la lógica para obtener los usuarios conectados
  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState(''); // Ajusta el valor según el usuario actual

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
    <div style={styles.container}>
      <h1>Chat</h1>
      <UserList users={users} onSelectUser={setSelectedUser} />
      <MessageArea messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Chat;

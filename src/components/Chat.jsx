// src/Chat.js
import stompService from "../utils/socketService";
import { useEffect, useState } from "react";
import Message from "./ui/Message";
import Input from "./ui/Input";
import Button from "./ui/Button";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [to, setTo] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (to) {
      stompService
        .subscribe(`/messageTo/${to}`, (msg) => {
          console.log("Mensaje recibido:", msg);
          setMessages((prevMessages) => [...prevMessages, msg]);
        })
        .catch((error) => console.error("Error al suscribirse:", error));
    }

    return () => {
      if (to) {
        stompService.unsubscribe(`/messageTo/${to}`);
      }
    };
  }, [to]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sender && to && message) {
      const newMessage = { sender, content: message };

      // Enviar el mensaje al servidor STOMP
      stompService.publish(`/sendMessage/${sender}`, newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Limpiar el input de mensaje
      setMessage("");

      // Hacer una solicitud POST para guardar el mensaje
      fetch(`http://localhost:8080/chat?to=${sender}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: sender,
          time: Date.now(),
          type: "text",
          content: message,
          credentials: "include",
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Mensaje guardado:", data))
        .catch((error) => console.error("Error al guardar el mensaje:", error));
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Chat</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <Input placeholder="Sender" value={sender} onChange={(e) => setSender(e.target.value)} />
        <Input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
        <Input placeholder="Escribir mensaje" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button text="Enviar" />
      </form>
      <h2>Historial de mensajes</h2>
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },
};

export default Chat;

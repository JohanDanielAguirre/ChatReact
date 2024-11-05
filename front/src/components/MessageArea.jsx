// MessageArea.jsx
import React from 'react';

const MessageArea = ({ messages }) => {
  return (
    <div className="message-area">
      <h3>Mensajes</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.sender}:</strong> {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageArea;

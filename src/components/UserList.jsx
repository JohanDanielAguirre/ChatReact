// UserList.jsx
import React from 'react';

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="user-list">
      <h3>Usuarios</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index} onClick={() => onSelectUser(user)}>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

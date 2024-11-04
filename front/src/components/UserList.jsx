// src/components/UserList.jsx
import React from 'react';

const UserList = ({ users, onSelectUser }) => {
    return (
        <div className="user-list">
            <h2>Users</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <input
                            type="radio"
                            name="selectedUser"
                            onChange={() => {
                                console.log(`Seleccionaste el usuario: ${user}`); 
                                onSelectUser(user);
                            }}
                        />
                        {user}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

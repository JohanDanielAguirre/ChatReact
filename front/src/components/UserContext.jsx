import React, { useState } from "react";

export const UserContext = React.createContext([]);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const addUser = (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    const removeUser = (userId) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
    };

    return (
        <UserContext.Provider value={{ users, addUser, removeUser }}>
            {children}
        </UserContext.Provider>
    );
};

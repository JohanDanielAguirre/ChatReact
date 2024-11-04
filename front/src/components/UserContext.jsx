// src/components/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        // Cargar usuarios de localStorage al inicializar el estado
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const addUser = (user) => {
        setUsers((prevUsers) => {
            const newUsers = [...new Set([...prevUsers, user])]; // Evitar duplicados
            localStorage.setItem('users', JSON.stringify(newUsers));
            return newUsers;
        });
    };

    const getUsers = () => {
        return users;
    };

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'users') {
                const updatedUsers = event.newValue ? JSON.parse(event.newValue) : [];
                setUsers(updatedUsers);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <UserContext.Provider value={{ users, addUser, getUsers }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);

import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider'; // Adjust the path as needed

const ThemeToggleButton = () => {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Toggle Theme
        </button>
    );
};

export default ThemeToggleButton;
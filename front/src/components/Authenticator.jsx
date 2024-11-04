import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import ThemeToggleButton from './ThemeToggleButton';
export default function Authenticator() {
    const [token] = useState("estoEsUnToken");

    const nav = useNavigate();

    const validateToken = () => {
        console.log("Validando token...");
    }

    useEffect(() => {
        validateToken();
    }, [token]);

    return (
        <div>
            <div style={{ display:'flex', flexDirection:'row'}}>
                <ThemeToggleButton />
                <button onClick={() => nav('/register')}>Registro</button>
                <button onClick={() => nav('/chat')}>Chat</button>
            </div>
            {token && <Outlet />}
        </div>
    )
}
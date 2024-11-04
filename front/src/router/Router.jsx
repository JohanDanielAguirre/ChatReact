import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Authenticator from "../components/Authenticator";
import RegisterPage from "../pages/RegisterPage";
import ChatPage from "../pages/ChatPage";
import { ThemeContext } from "../components/ThemeProvider";



const router = createRoutesFromElements([
    
    <Route path="/" element={<Authenticator />} >
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat/:user?" element={<ChatPage />} />
        <Route path="*" element={<div>NotFound</div>} />
    </Route>
    
])

export const routes = createBrowserRouter(router);
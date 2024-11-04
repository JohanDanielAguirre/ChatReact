import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Authenticator from "../components/Authenticator";
import RegisterPage from "../pages/RegisterPage";
import Chat from "../pages/ChatPage";

const router = createRoutesFromElements([
    <Route path="/" element={<Authenticator />} >
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat/:user?" element={<Chat />} />
        <Route path="*" element={<div>NotFound</div>} />
    </Route>
])

export const routes = createBrowserRouter(router);
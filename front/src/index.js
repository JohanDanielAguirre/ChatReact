import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./router/Router";
import { ThemeProvider } from "./components/ThemeProvider";
import { UserProvider } from './components/UserContext';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <ThemeProvider>
          <UserProvider>
            <RouterProvider router={routes} />
          </UserProvider>
      </ThemeProvider>,
    
  </React.StrictMode>
);

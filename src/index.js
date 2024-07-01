import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { SocketContextProvider } from "./Context/SocketContext.jsx";
import axios from "axios";

// Configure axios to include credentials in requests
axios.defaults.withCredentials=true;
axios.defaults.baseURL = process.env.REACT_APP_BEURL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
        <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

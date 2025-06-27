import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  
);
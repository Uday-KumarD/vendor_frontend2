import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // console.log('Sending request with token:', token.substring(0, 20) + '...');
  } else {
    // console.log('No token found for request:', config.method, config.url);
  }
  return config;
}, error => {
  console.error('Request Interceptor Error:', error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => response, error => {
  console.error('Response Error:', error.response?.data || error.message);
  return Promise.reject(error);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
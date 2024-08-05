import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Function to set the token in localStorage with a timestamp
function setToken(token) {
  const currentTime = new Date().getTime();
  localStorage.setItem('token', token);
  localStorage.setItem('token_timestamp', currentTime);
}

// Function to remove the token from localStorage
function removeToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('token_timestamp');
}

// Function to check the token expiration
function checkTokenExpiration() {
  const token = localStorage.getItem('token');
  const tokenTimestamp = localStorage.getItem('token_timestamp');
  if (token && tokenTimestamp) {
    const currentTime = new Date().getTime();
    const oneHour = 3600000; // 1 hour in milliseconds
    if (currentTime - tokenTimestamp > oneHour) {
      removeToken();
      alert('Your session has expired. You have been logged out.');
      // Redirect to login page or perform other actions as needed
    }
  }
}

// Set a timer to automatically check for token expiration
setTimeout(checkTokenExpiration, 3600000);

// Example usage: set a token and start the auto-logout timer

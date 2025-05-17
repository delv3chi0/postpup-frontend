import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("✅ main.jsx starting render");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

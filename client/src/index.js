import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// The Vision: Mounting the React UI to the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
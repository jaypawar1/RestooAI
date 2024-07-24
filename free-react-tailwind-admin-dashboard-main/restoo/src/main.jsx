import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MenuProvider } from './context/menuContext.jsx'; // Adjust the path as necessary

const RootComponent = () => (
  <Router>
    <MenuProvider>
      <App />
    </MenuProvider>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);

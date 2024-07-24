import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

// Create the context
export const MenuContext = createContext('');

// Create the provider component
export const MenuProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [client,setClient]=useState('');
  const location = useLocation();
  const { someRouteParam } = useParams(); // Replace with your actual route parameter

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const resto = params.get('resto');
    const client = params.get('client');
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/menu/${resto}`);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    const fetchClient= async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/client/${client}`);
        setClient(res.data.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    if (resto) {
      fetchMenu();
      fetchClient();
    }
  }, [location.search, someRouteParam]); // Add other dependencies if needed

  return (
    <MenuContext.Provider value={[user,client]}>
      {children}
    </MenuContext.Provider>
  );
};

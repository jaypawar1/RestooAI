import React, { useEffect, useState } from 'react';

const MenuNoti: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [inputMessage, setInputMessage] = useState<string>('');
  const userId = '123'; // Replace with actual user ID

  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const eventSource = new EventSource(`${serverUrl}/webhooks/sse`);
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(JSON.stringify(data.order));
      console.log(data);
      
      console.log('Dashboard received message:', data.order);
    };

    return () => {
      eventSource.close();
    };
  }, []);


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Received Message: {message}</p>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      </div>
  );
};

export default MenuNoti;
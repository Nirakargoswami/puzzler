import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const CompetitionsPage = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = socketIOClient('http://localhost:5000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleStartCompetition = () => {
    socket.emit('startCompetition');
  };

  return (
    <div>
      <h2>Competitions</h2>
      <button onClick={handleStartCompetition}>Start Competition</button>
    </div>
  );
};

export default CompetitionsPage;

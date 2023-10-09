// Live.js
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const Live = ({ match }) => {
  const [socket, setSocket] = useState(null);
  const [isCompetitionStarted, setIsCompetitionStarted] = useState(false);
console.log(socket,isCompetitionStarted)
  useEffect(() => {
    const newSocket = socketIOClient('http://localhost:5000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('startCompetition', () => {
        setIsCompetitionStarted(true);
      });
    }
  }, [socket]);

  const handleStartCompetition = () => {
    // User clicks to start the competition
    // Emit a 'startCompetition' event to the server
    socket.emit('startCompetition');
  };

  return (
    <div>
      <h1>Quiz App</h1>
      {!isCompetitionStarted ? (
        <button onClick={handleStartCompetition}>Start Competition</button>
      ) : (
        <p>Competition has started!</p>
        /* Render quiz questions and competition UI */
      )}
    </div>
  );
};

export default Live;

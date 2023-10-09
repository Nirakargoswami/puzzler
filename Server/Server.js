// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], // Specify the allowed HTTP methods
  },
});
const waitingUsers = []; // Users waiting for a match

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected: ' + socket.id);
    const index = waitingUsers.indexOf(socket.id);
    if (index !== -1) {
      waitingUsers.splice(index, 1); // Remove user from waiting list
    }
  });

  // Handle user request to start a competition
  socket.on('startCompetition', () => {
    waitingUsers.push(socket.id);

    // Check if there are enough users to start a competition (e.g., 2 users)
    if (waitingUsers.length >= 2) {
      const players = [waitingUsers.pop(), waitingUsers.pop()]; // Get two waiting players
      startCompetition(io, players); // Start the competition for these players
    }
  });
});

function startCompetition(io, players) {
  // Logic to start the competition for the specified players
  console.log('Starting competition for players:', players);
  // You can implement the quiz questions, scores, and competition logic here

  // Notify the players that the competition has started
  players.forEach((playerId) => {
    console.log(playerId)
    io.to(playerId).emit('competitionStarted');
  });
}

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});

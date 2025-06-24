const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Socket.IO server is running!</h1>');
  }
});
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const rooms = {};

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ roomCode, player }) => {
    socket.join(roomCode);
    if (!rooms[roomCode]) rooms[roomCode] = { players: [], gameState: null };
    rooms[roomCode].players.push({ id: socket.id, ...player });
    io.to(roomCode).emit('playerList', rooms[roomCode].players);
    socket.to(roomCode).emit('playerJoined', player);
  });

  socket.on('leaveRoom', ({ roomCode }) => {
    socket.leave(roomCode);
    if (rooms[roomCode]) {
      rooms[roomCode].players = rooms[roomCode].players.filter(p => p.id !== socket.id);
      io.to(roomCode).emit('playerList', rooms[roomCode].players);
      socket.to(roomCode).emit('playerLeft', { id: socket.id });
    }
  });

  socket.on('gameAction', ({ roomCode, action }) => {
    // action: { type, payload }
    io.to(roomCode).emit('gameUpdate', action);
  });

  socket.on('declare', ({ roomCode, playerId }) => {
    io.to(roomCode).emit('playerDeclared', { playerId });
  });

  socket.on('disconnecting', () => {
    Object.keys(socket.rooms).forEach(roomCode => {
      if (rooms[roomCode]) {
        rooms[roomCode].players = rooms[roomCode].players.filter(p => p.id !== socket.id);
        io.to(roomCode).emit('playerList', rooms[roomCode].players);
        socket.to(roomCode).emit('playerLeft', { id: socket.id });
      }
    });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
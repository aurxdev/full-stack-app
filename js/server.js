const express = require('express');
const passport = require('passport');
const routes = require('./routes');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
  }
});
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(passport.initialize());
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Use cors middleware for Express
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

// API ENDPOINTS
app.use(routes);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // recevoir un nouveau message et le diffuser à tous les clients connectés
  socket.on('newMessage', (message) => {
    io.emit('message', message);
  });
});

server.listen(port, () => {
  console.log(`Server express is running on port ${port}`);
});

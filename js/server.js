/* INITIALISATION SERVEUR EXPRESS.JS */

const express = require('express');
const users = require('./db/users');
const tickets = require('./db/tickets');
const messages = require('./db/messages');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// entêtes CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
  next();
});


app.listen(port, () => {
  console.log(`Server express is running on port ${port}`);
});


// API ENDPOINTS

// USERS
app.get('/api/users',users.getUsers); 
app.get('/api/users/:id/isSupport', users.getSupport);
app.get('/api/users/:id', users.getUserById);
app.post('/api/register', users.register);
app.post('/api/login', users.login);

// TICKETS
app.get('/api/tickets/:id', tickets.getTickets);
app.get('/api/ticket/:id', tickets.getTicketById);
app.get('/api/tickets/users/:id', tickets.getTicketByUserId);
app.post('/api/create-ticket', tickets.createTicket);
app.put('/api/tickets/update-etat/:id', tickets.updateTicketEtat);


// MESSAGES
app.get('/api/messages', messages.getMessages);
app.get('/api/messages/tickets/:id', messages.getMessageByTicket);
app.post('/api/create-message', messages.createMessage);
// routes.js
const express = require('express');
const users = require('./db/users');
const tickets = require('./db/tickets');
const messages = require('./db/messages');
const { authenticateJwt } = require('./auth');

const router = express.Router();

// USERS
router.get('/api/users', authenticateJwt, users.getUsers);
router.get('/api/users/:id/isSupport', authenticateJwt, users.getSupport);
router.get('/api/users/:id', authenticateJwt, users.getUserById);
router.post('/api/register', users.register);
router.post('/api/login', users.login);

// TICKETS
router.get('/api/tickets/:id', authenticateJwt, tickets.getTickets);
router.get('/api/ticket/:id', authenticateJwt, tickets.getTicketById);
router.get('/api/tickets/users/:id', authenticateJwt, tickets.getTicketByUserId);
router.post('/api/create-ticket', authenticateJwt, tickets.createTicket);
router.put('/api/tickets/update-etat/:id', authenticateJwt, tickets.updateTicketEtat);

// MESSAGES
router.get('/api/messages', authenticateJwt, messages.getMessages);
router.get('/api/messages/tickets/:id', authenticateJwt, messages.getMessageByTicket);
router.post('/api/create-message', authenticateJwt, messages.createMessage);

module.exports = router;
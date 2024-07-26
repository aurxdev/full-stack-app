// server.js
const express = require('express');
const passport = require('passport');
const routes = require('./routes'); // Importer les routes

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());

// entêtes CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
  next();
});

// API ENDPOINTS
app.use(routes);

app.listen(port, () => {
  console.log(`Server express is running on port ${port}`);
});
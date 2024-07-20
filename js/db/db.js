const { Pool } = require('pg');

const pool = new Pool({
  user: 'mad',
  host: '10.0.1.21',
  database: 'angular',
  password: 'mad8888',
  port: 5432,
});

/* CONNEXION À LA BASE DE DONNÉES POSTGRESQL */

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

module.exports = pool;
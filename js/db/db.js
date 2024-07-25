const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'angular',
  password: 'root',
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
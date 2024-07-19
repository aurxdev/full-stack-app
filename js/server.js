/* INITIALISATION SERVEUR EXPRESS.JS */

const express = require('express');


const app = express();
const users = require('./db/users');
app.use(express.json());

const port = process.env.PORT || 3000;

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


// API USERS ENDPOINTS

app.get('/api/users',users.getUsers); 
app.get('/api/users/:id/isSupport', users.getSupport);
app.get('/api/users/:id', users.getUserById);
app.post('/api/register', users.register);
app.post('/api/login', users.login);

/* CRUD IMPLEMENTATIONS 

app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  pool.query(
    'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;

  pool.query(
    'DELETE FROM items WHERE id = $1 RETURNING *',
    [id],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});
*/
/* INITIALISATION SERVEUR EXPRESS.JS */

const express = require('express');
const { comparePassword, generateJwtToken, encryptPassword } = require('./auth');

const app = express();
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

/* CONNEXION À LA BASE DE DONNÉES POSTGRESQL */

const { Pool } = require('pg');

const pool = new Pool({
  user: 'mad',
  host: '10.0.1.21',
  database: 'angular',
  password: 'mad8888',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});


/* API ENDPOINTS */

app.get('/api/users', (req, res) => {
    pool.query('SELECT * FROM public.users', (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result.rows);
      }
    });
  });

  app.get('/api/users/:id/isSupport', (req, res) => {
    const { id } = req.params;
  
    pool.query('SELECT isSupport FROM public.users WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Utilisateur non trouvé.' });
      } else {
        res.json(result.rows[0]);
      }
    });
  });

  app.get('/api/users/:id', (req, res) => {

    const id  = req.params.id;
  
    pool.query('SELECT * FROM public.users WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Utilisateur non trouvé.' });
      } else {
        res.json(result.rows[0]);
      }
    });
  });
  
  app.post('/api/register', async (req, res) => {
    const name = req.body.username;
    let mdp = req.body.password;
  
    if (!name || !mdp) {
      return res.status(400).json({ error: 'Nom et mdp requis.' });
    }
  
    try {
      const hash = await encryptPassword(mdp);
      // on insère l'utilisateur après le hachage du mot de passe
      const result = await pool.query(
        'INSERT INTO public.users (nom, mdp, isSupport) VALUES ($1, $2, $3) RETURNING *',
        [name, hash, false]
      );
      return res.json(result.rows[0]);
    } catch (err) {
      console.error('Erreur lors de l\'exécution ou du hash:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/api/login', async (req, res) => {
    const name = req.body.username;
    let mdp = req.body.password;
  
    if (!name || !mdp) {
      return res.status(400).json({ error: 'Nom et mdp requis.' });
    }
  
    try {
      const result = await pool.query('SELECT * FROM public.users WHERE nom = $1', [name]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
  
      const user = result.rows[0];
      console.log(user);
      const isMatch = await comparePassword(mdp, user.mdp);
      if (isMatch) {
        const token = generateJwtToken({ id: user.id, username: user.nom, support: user.issupport }); 
        return res.json({ success: true, message: "Authentification réussie!", token: token });
      } else {
        return res.status(401).json({ error: 'Mot de passe ne correspond pas.' });
      }
    } catch (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  /* CRUD IMPLEMENTATIONS */

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
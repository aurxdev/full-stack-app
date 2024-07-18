/* INITIALISATION SERVEUR EXPRESS.JS */

const express = require('express');
const app = express();
app.use(express.json());

const bcrypt = require('bcrypt');
const saltRounds = 10; 


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
  console.log("GET /api/items");
    pool.query('SELECT * FROM public.users', (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result.rows);
      }
    });
  });
  
  app.post('/api/register', (req, res) => {
    const name = req.body.username;
    let mdp = req.body.password;
  
    if (!name || !mdp) {
      return res.status(400).json({ error: 'Nom et mdp requis.' });
    }
  
    bcrypt
      .hash(mdp, saltRounds)
      .then(hash => {
        // on insère ici après le hachage du mot de passe
        pool.query(
          'INSERT INTO public.users (nom, mdp, isSupport) VALUES ($1, $2, $3) RETURNING *',
          [name, hash, false], 
          (err, result) => {
            if (err) {
              console.error('Error executing query:', err);
              return res.status(500).json({ error: 'Internal Server Error' });
            } else {
              return res.json(result.rows[0]);
            }
          }
        );
      })
      .catch(err => {
        console.error(err.message);
        return res.status(500).json({ error: 'Erreur lors du hachage du mot de passe' });
      });
  });

  app.post('/api/login', (req, res) => {
    const name = req.body.username;
    let mdp = req.body.password;
  
    if (!name || !mdp) {
      return res.status(400).json({ error: 'Nom et mdp requis.' });
    }
    pool.query(
      'SELECT * FROM public.users WHERE nom = $1',
      [name], (err,result) => {
        if(err){
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if(result.rows.length === 0){
          return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        bcrypt.compare(mdp, result.rows[0].mdp, (err,isMatch) => {
          if(err){
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          if(isMatch){
            return res.json({success: true, message:"Authentification réussie!"});
          }else{
            return res.status(404).json({ error: 'Mot de passe ne correspond pas.' });
          }

        });

      }
    )


    

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
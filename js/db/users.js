const { comparePassword, generateJwtToken, encryptPassword } = require('../auth');

const pool = require('./db');

/* API ENDPOINTS */

const getUsers = (req, res) => {
    pool.query('SELECT * FROM public.users', (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result.rows);
      }
    });
};

const getSupport = (req, res) => {
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
};

const getUserById = (req, res) => {

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
  };

const register = async (req, res) => {
    const name = req.body.username;
    let mdp = req.body.password;
  
    if (!name || !mdp) {
      return res.status(400).json({ error: 'Nom et mdp requis.' });
    }
  
    try {

      // on vérifie si un utilisateur avec le même nom existe déjà
      const userExists = await pool.query('SELECT * FROM public.users WHERE nom = $1', [name]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: 'Le nom d\'utilisateur existe déjà.' });
      }


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
};

const login = async (req, res) => {
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
};

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


module.exports = {
    getUsers,
    getSupport,
    getUserById,
    register,
    login,
}

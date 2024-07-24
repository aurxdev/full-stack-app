const pool = require('./db');

/* API ENDPOINTS */

// renvoie tous les tickets
const getTickets = (req, res) => {
    pool.query('SELECT * FROM public.tickets', (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result.rows);
      }
    });
}

// renvoie un ticket par son id
const getTicketById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM public.tickets WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Ticket non trouvé.' });
      } else {
        res.json(result.rows[0]);
      }
    });
}

// renvoie les tickets par l'id de l'utilisateur
const getTicketByUserId = (req, res) => {
    const id  = req.params.id;
    pool.query('SELECT * FROM public.tickets WHERE idUser = $1', [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Ticket non trouvé.' });
      } else {
        res.json(result.rows[0]);
      }
    });
  }



// créer un ticket
const createTicket = async (req, res) => {
    // console.log(req.body);
    const { nom, categorie, description, etat, idUser } = req.body;
  
    if (!nom || !categorie || !description || !idUser) {
      return res.status(400).json({ error: 'Titre, description, userId et idSupport requis.' });
    }

    try{
        const result = await pool.query('INSERT INTO public.tickets (nom, categorie, description, date, etat, idUser, idSupport) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [nom, categorie, description, new Date(), 0, idUser, 1]);
        return res.json(result.rows[0]);
    }
    catch (err){
        console.error('Erreur lors de l\'exécution!', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getTickets,
    getTicketById,
    getTicketByUserId,
    createTicket
};
const db = require('./db');

/* API ENDPOINTS */

// renvoie tous les messages
const getMessages = (req, res) => {
    db.query('SELECT * FROM public.messages', (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result.rows);
      }
    });
}

// renvoie les messages par l'id du ticket
const getMessageByTicket = (req, res) => {

    const id  = req.params.id;
    console.log(id);

    db.query('SELECT * FROM public.messages WHERE idTicket = $1', [id], (err, result) => {
    if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Message non trouvé.' });
    } else {
        res.json(result.rows[0]);
    }
    });
}


const createMessage = async (req, res) => {

    const { contenu, idTicket, idUser } = req.body;
  
    if (!contenu || !idTicket || !idUser) {
      return res.status(400).json({ error: 'Contenu, idTicket et idUser requis.' });
    }

    try{
        const result = await db.query('INSERT INTO public.messages (idTicket, contenu, date, idUser) VALUES ($1, $2, $3, $4) RETURNING *', [idTicket, contenu, new Date(), idUser]);
        return res.json(result.rows[0]);
    }
    catch (err){
        console.error('Erreur lors de l\'exécution!', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = {
    getMessages,
    getMessageByTicket,
    createMessage
};
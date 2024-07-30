const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db/db');

// todo: garder la clé secrète dans un fichier .env
const secretKey = 'de7e7404e597e75e87bd5cfe082b23d71ce6b9df473a9b4e287c0560620c6cb3';

// fonction pour générer un token JWT
const generateJwtToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    support: user.support,
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const getUserById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM public.users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      throw new Error('Utilisateur non trouvé.');
    }
    return result.rows[0];
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
};

// stratégie JWT 
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    async (payload, done) => {
      try {
        const user = await getUserById(payload.id);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// middleware pour vérifier le token JWT de l'utilisateur
const authenticateJwt = (req, res, next) => {
  // console.log('Authorization Header:', req.headers.authorization); // Ajout de log
  passport.authenticate('jwt', { session: false }, (err, user) => {
    // console.log(user); // Ajout de log
    if (err) {
      console.error('Error authenticating JWT:', err); // Ajout de log
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!user) {
      console.warn('No user found'); // Ajout de log
      res.status(401).json({ error: 'Vous devez vous reconnecter pour continuer.' });
    } else {
      // console.log('Authenticated user:', user); // Ajout de log
      req.user = user;
      next();
    }
  })(req, res, next);
};


// middleware pour vérifier le rôle de l'utilisateur
const roleMiddleware = () => {
  return (req, res, next) => {
    if (!req.user || req.user.issupport !== true) {
      return res.status(403).json({ error: 'Accès refusé. Rôle insuffisant.' });
    }
    next();
  };
};


// permet de crypter le mot de passe
const encryptPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// permet de comparer 2 mots de passe
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  generateJwtToken,
  authenticateJwt,
  encryptPassword,
  comparePassword,
  roleMiddleware,
};
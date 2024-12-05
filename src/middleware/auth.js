const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const autenticar = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acesso negado');

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (err) {
    res.status(400).send('Token inválido');
  }
};

module.exports = autenticar;

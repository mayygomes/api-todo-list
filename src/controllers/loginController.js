const jwt = require('jsonwebtoken');
const connection = require('../config/db');

const login = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }
    
    // Verifica se o usuário existe no banco de dados
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) return res.status(500).json({ message: 'Erro no servidor.', error: err });

      if (results.length === 0) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const user = results[0];

      // Compara a senha fornecida com a senha armazenada no banco 
      if (user.senha !== senha) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      // Gera o token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );

      res.json({ message: 'Login bem-sucedido.', token });
    });
};

module.exports = login;

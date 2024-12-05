const connection = require('../config/db');

// Criar um novo usuário
exports.createUsuario = (req, res) => {
  const { nome, email, senha } = req.body;
  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';

  connection.query(query, [nome, email, senha], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao criar o usuário');
    }
    res.status(201).send({ id: results.insertId, nome, email });
  });
};

// Listar todos os usuários
exports.getUsuarios = (req, res) => {
  const query = 'SELECT * FROM usuarios';

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao listar usuários');
    }
    res.status(200).json(results);
  });
};

// Atualizar um usuário
exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';

  connection.query(query, [nome, email, senha, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar usuário');
    }
    res.status(200).send('Usuário atualizado com sucesso');
  });
};

// Deletar um usuário
exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao deletar usuário');
    }
    res.status(200).send('Usuário deletado com sucesso');
  });
};

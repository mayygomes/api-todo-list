const connection = require('../config/db');

// Criar uma nova tarefa
const createTarefa = (req, res) => {
  const { descricao, usuario_id } = req.body;
  const query = 'INSERT INTO tarefas (descricao, usuario_id) VALUES (?, ?)';

  connection.query(query, [descricao, usuario_id], (err, results) => {
    if (err) {
      console.log('Erro:', err);
      return res.status(500).send('Erro ao criar a tarefa');
    }
    res.status(201).send({ id: results.insertId, descricao });
  });
};

// Vizualizar tarefas
const getTarefas = (req, res) => {
  const { usuario_id } = req.params;
  const query = 'SELECT * FROM tarefas WHERE usuario_id = ?';

  connection.query(query, [usuario_id], (err, results) => {
    if (err) {
      console.log('Erro:', err);
      return res.status(500).send('Erro ao listar tarefas');
    }
    res.status(200).json(results);
  });
};

// Atualizar uma tarefa
const updateTarefa = (req, res) => {
  const { id } = req.params;
  const { descricao, status } = req.body;
  const query = 'UPDATE tarefas SET descricao = ?, status = ? WHERE id = ?';

  connection.query(query, [descricao, status, id], (err, results) => {
    if (err) {
      console.log('Erro:', err);
      return res.status(500).send('Erro ao atualizar tarefa');
    }
    res.status(200).send('Tarefa atualizada com sucesso');
  });
};

// Deletar uma tarefa
const deleteTarefa = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tarefas WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.log('Erro:', err);
      return res.status(500).send('Erro ao deletar tarefa');
    }
    res.status(200).send('Tarefa deletada com sucesso');
  });
};

  module.exports = {
    createTarefa,
    getTarefas,
    updateTarefa,
    deleteTarefa,
  };
  
const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

// Rotas de Tarefas
router.post('/tarefas', tarefasController.createTarefa); // /api/tarefas
router.get('/tarefas/:usuario_id', tarefasController.getTarefas); // /api/tarefas/:usuario_id
router.put('/tarefas/:id', tarefasController.updateTarefa);
router.delete('/tarefas/:id', tarefasController.deleteTarefa);

module.exports = router;

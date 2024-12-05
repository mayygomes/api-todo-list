const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

// Rotas de Tarefas
router.post('/tarefas', tarefasController.createTarefa);
router.get('/tarefas/:usuario_id', tarefasController.getTarefas);
router.put('/tarefas/:id', tarefasController.updateTarefa);
router.delete('/tarefas/:id', tarefasController.deleteTarefa);

module.exports = router;

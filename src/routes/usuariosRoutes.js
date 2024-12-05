const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rotas de Usuários
router.post('/usuarios', usuariosController.createUsuario);
router.get('/usuarios', usuariosController.getUsuarios);
router.put('/usuarios/:id', usuariosController.updateUsuario);
router.delete('/usuarios/:id', usuariosController.deleteUsuario);

module.exports = router;

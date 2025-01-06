const express = require('express');
const app = express();
const dotenv = require('dotenv');
const usuariosRoutes = require('./routes/usuariosRoutes');
const tarefasRoutes = require('./routes/tarefasRoutes');
const loginRoutes = require('./routes/loginRoutes');

dotenv.config();

app.use(express.json());  // Para parsear o corpo das requisições em JSON

// Rotas
app.use('/api', usuariosRoutes);
app.use('/api', tarefasRoutes);
app.use('/api', loginRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(3005, () => {
  console.log('Servidor rodando na porta 3005');
});

const express = require('express');
const app = express();
/*const port = process.env.PORT || 3000;*/
const dotenv = require('dotenv');
const usuariosRoutes = require('./routes/usuariosRoutes');
const tarefasRoutes = require('./routes/tarefasRoutes');

dotenv.config();

app.use(express.json());  // Para parsear o corpo das requisições em JSON

// Rotas
app.use('/api', usuariosRoutes);
app.use('/api', tarefasRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

/*app.get('/olamundo', (req, res) => {
  res.send('Olá Mundo');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});*/

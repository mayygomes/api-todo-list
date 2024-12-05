const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/olamundo', (req, res) => {
  res.send('Olá Mundo');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

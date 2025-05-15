const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const skuCounts = {};

app.use(bodyParser.json());
app.use(express.static('public')); // onde fica o index.html

app.post('/api/save', (req, res) => {
  const { sku } = req.body;
  if (!sku) return res.status(400).send('SKU inválido');

  skuCounts[sku] = (skuCounts[sku] || 0) + 1;
  console.log(`SKU recebido: ${sku} - Total: ${skuCounts[sku]}`);
  res.send({ sucesso: true });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

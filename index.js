const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const skuCounts = {};

app.post('/api/save', (req, res) => {
  const { sku } = req.body;
  if (!sku) return res.status(400).json({ error: 'SKU não enviado' });

  skuCounts[sku] = (skuCounts[sku] || 0) + 1;
  console.log(`SKU ${sku} escaneado. Total: ${skuCounts[sku]}`);

  res.json({ success: true, count: skuCounts[sku] });
});

app.get('/api/counts', (req, res) => {
  res.json(skuCounts);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

const express = require('express');
const app = express();

app.use(express.json());

const skuCounts = {};

app.post('/api/save', (req, res) => {
  const { sku } = req.body;
  if (!sku) return res.status(400).json({ error: 'SKU não enviado' });

  skuCounts[sku] = (skuCounts[sku] || 0) + 1;

  res.json({ success: true, count: skuCounts[sku], skuCounts });
});

app.get('/api/counts', (req, res) => {
  res.json(skuCounts);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server rodando na porta ${port}`));

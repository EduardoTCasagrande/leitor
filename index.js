const express = require('express');
const app = express();

app.use(express.json());

const skuCounts = {};

app.post('/api/save', (req, res) => {
  const { sku } = req.body;
  if (!sku) return res.status(400).json({ error: 'SKU não enviado' });

  skuCounts[sku] = (skuCounts[sku] || 0) + 1;
  console.log(`SKU ${sku} escaneado. Total: ${skuCounts[sku]}`);

  res.json({ success: true, count: skuCounts[sku] });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server rodando na porta ${port}`));

let skuCounts = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { sku } = req.body;
    if (!sku) return res.status(400).json({ error: 'SKU não enviado' });
    
    skuCounts[sku] = (skuCounts[sku] || 0) + 1;
    console.log(`SKU ${sku} escaneado. Total: ${skuCounts[sku]}`);

    return res.json({ success: true, count: skuCounts[sku] });
  }
  return res.status(405).json({ error: 'Método não permitido' });
}

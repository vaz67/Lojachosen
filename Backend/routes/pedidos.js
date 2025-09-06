const express = require("express");
const router = express.Router();

let pedidos = [];

// GET /api/pedidos
router.get("/", (req, res) => {
  res.json(pedidos);
});

// POST /api/pedidos
router.post("/", (req, res) => {
  const { cliente, itens, total } = req.body;
  const novoPedido = { id: pedidos.length + 1, cliente, itens, total, status: "pendente" };
  pedidos.push(novoPedido);
  res.json({ msg: "Pedido criado", pedido: novoPedido });
});

module.exports = router;

const express = require("express");
const router = express.Router();

let carrinho = [];

// GET /api/carrinho
router.get("/", (req, res) => {
  res.json(carrinho);
});

// POST /api/carrinho
router.post("/", (req, res) => {
  const { id, nome, preco, qtd } = req.body;
  carrinho.push({ id, nome, preco, qtd });
  res.json({ msg: "Produto adicionado ao carrinho", carrinho });
});

// DELETE /api/carrinho/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  carrinho = carrinho.filter(item => item.id != id);
  res.json({ msg: "Produto removido", carrinho });
});

module.exports = router;

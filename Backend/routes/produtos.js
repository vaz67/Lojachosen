const express = require("express");
const router = express.Router();

// Mock inicial de produtos
const produtos = [
  { id: 1, nome: "Camiseta Logo", preco: 800, categoria: "camisetas" },
  { id: 2, nome: "Camisola Minimal", preco: 1200, categoria: "camisolas" },
  { id: 3, nome: "Camisa Slim Fit", preco: 1500, categoria: "camisas" }
];

// GET /api/produtos
router.get("/", (req, res) => {
  res.json(produtos);
});

module.exports = router;

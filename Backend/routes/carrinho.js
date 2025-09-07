const express = require("express");
const { body, validationResult } = require("express-validator");
const Carrinho = require("../models/Carrinho");

const router = express.Router();

// GET → lista carrinho
router.get("/", async (req, res) => {
  try {
    const itens = await Carrinho.findAll();
    res.json({ success: true, data: itens });
  } catch (err) {
    res.status(500).json({ success: false, error: "Erro ao buscar carrinho" });
  }
});

// POST → adicionar item
router.post(
  "/",
  body("produtoId").isInt().withMessage("ProdutoId inválido"),
  body("qtd").isInt({ min: 1 }).withMessage("Quantidade deve ser >= 1"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const item = await Carrinho.create(req.body);
      res.json({ success: true, msg: "Item adicionado ao carrinho", data: item });
    } catch (err) {
      res.status(500).json({ success: false, error: "Erro ao adicionar ao carrinho" });
    }
  }
);

// DELETE → remover item
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Carrinho.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Item não encontrado" });
    }

    res.json({ success: true, msg: "Item removido" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Erro ao remover item" });
  }
});

module.exports = router;

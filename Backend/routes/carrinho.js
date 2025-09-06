const express = require("express");
const { body, validationResult } = require("express-validator");
const Carrinho = require("../models/Carrinho");

const router = express.Router();

// GET → lista carrinho
router.get("/", async (req, res) => {
  try {
    const itens = await Carrinho.findAll();
    res.json(itens);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar carrinho" });
  }
});

// POST → adicionar item
router.post(
  "/",
  body("produtoId").isInt().withMessage("ProdutoId inválido"),
  body("qtd").isInt({ min: 1 }).withMessage("Quantidade deve ser >= 1"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const item = await Carrinho.create(req.body);
      res.json({ msg: "Item adicionado ao carrinho", item });
    } catch (err) {
      res.status(500).json({ error: "Erro ao adicionar ao carrinho" });
    }
  }
);

// DELETE → remover item
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Carrinho.destroy({ where: { id } });
    res.json({ msg: "Item removido" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover item" });
  }
});

module.exports = router;

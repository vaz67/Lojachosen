const express = require("express");
const { body, validationResult } = require("express-validator");
const Produto = require("../models/Produto");

const router = express.Router();

// GET /api/produtos → lista todos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// POST /api/produtos → adicionar produto
router.post(
  "/",
  body("nome").notEmpty().withMessage("Nome é obrigatório"),
  body("preco").isNumeric().withMessage("Preço deve ser numérico"),
  body("categoria").notEmpty().withMessage("Categoria é obrigatória"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const produto = await Produto.create(req.body);
      res.json({ msg: "Produto criado", produto });
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  }
);

module.exports = router;

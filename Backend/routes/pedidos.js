const express = require("express");
const { body, validationResult } = require("express-validator");
const Pedido = require("../models/Pedido");

const router = express.Router();

// GET → lista pedidos
router.get("/", async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
});

// POST → criar pedido
router.post(
  "/",
  body("cliente").notEmpty().withMessage("Cliente é obrigatório"),
  body("itens").isArray({ min: 1 }).withMessage("Itens inválidos"),
  body("total").isNumeric().withMessage("Total deve ser numérico"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const pedido = await Pedido.create(req.body);
      res.json({ msg: "Pedido criado", pedido });
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar pedido" });
    }
  }
);

module.exports = router;

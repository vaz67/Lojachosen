const express = require("express");
const { body, validationResult } = require("express-validator");
const Pedido = require("../models/Pedido");

const router = express.Router();

// GET → lista pedidos
router.get("/", async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json({ success: true, data: pedidos });
  } catch (err) {
    res.status(500).json({ success: false, error: "Erro ao buscar pedidos" });
  }
});

// POST → criar pedido
router.post(
  "/",
  body("cliente").notEmpty().withMessage("Cliente é obrigatório"),
  body("itens").isArray({ min: 1 }).withMessage("Itens inválidos"),
  body("total").isFloat({ min: 0 }).withMessage("Total deve ser numérico positivo"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const pedido = await Pedido.create(req.body);
      res.json({ success: true, msg: "Pedido criado", data: pedido });
    } catch (err) {
      res.status(500).json({ success: false, error: "Erro ao criar pedido" });
    }
  }
);

module.exports = router;

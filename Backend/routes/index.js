const express = require("express");
const router = express.Router();

// Rotas
router.use("/produtos", require("./produtos"));
router.use("/carrinho", require("./carrinho"));
router.use("/pedidos", require("./pedidos"));

module.exports = router;

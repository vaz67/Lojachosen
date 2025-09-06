const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/produtos", require("./routes/produtos"));
app.use("/api/carrinho", require("./routes/carrinho"));
app.use("/api/pedidos", require("./routes/pedidos"));

app.get("/", (req, res) => {
  res.send("API Chosen rodando 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 4000;

// ===== Middlewares Globais =====
app.use(express.json({ limit: "2mb" }));
app.use(helmet());
app.use(morgan("dev"));

// CORS (permitir apenas frontend oficial)
const allowedOrigins = [
  "https://lojachosen.online",
  "http://localhost:3000" // opcional p/ testes locais
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Não autorizado pelo CORS"));
    }
  }
}));

// Limite de requisições (100 por 15min/IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: "Muitas requisições deste IP, tente mais tarde." }
});
app.use(limiter);

// ===== Rotas =====
app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.json({ success: true, msg: "API Chosen rodando 🚀" });
});

// ===== Middleware global de erros =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Erro interno no servidor" });
});

// ===== Start =====
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// seeds.js
const Produto = require("./models/Produto");
require("dotenv").config();

async function seed() {
  try {
    // Autenticar
    await Produto.sequelize.authenticate();
    console.log("✅ Conexão com o banco estabelecida!");

    const produtos = [
      { nome: "Camiseta Logo", preco: 800, categoria: "camisetas" },
      { nome: "Camiseta Oversized", preco: 950, categoria: "camisetas" },
      { nome: "Camisola Minimal", preco: 1200, categoria: "camisolas" },
      { nome: "Camisola Essential", preco: 1350, categoria: "camisolas" },
      { nome: "Camisa Slim Fit", preco: 1500, categoria: "camisas" },
      { nome: "Camisa Clássica", preco: 1700, categoria: "camisas" },
    ];

    for (const p of produtos) {
      await Produto.findOrCreate({
        where: { nome: p.nome }, // evita duplicados com base no nome
        defaults: p,
      });
    }

    console.log("🌱 Produtos inseridos/atualizados com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao inserir produtos:", err);
    process.exit(1);
  }
}

seed();

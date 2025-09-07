// seedsCarrinho.js
const Carrinho = require("./models/Carrinho");
const Produto = require("./models/Produto");
require("dotenv").config();

async function seedCarrinho() {
  try {
    await Carrinho.sequelize.authenticate();
    console.log("✅ Conexão com o banco estabelecida!");

    // Pegamos alguns produtos já existentes
    const produtos = await Produto.findAll({ limit: 2 });

    if (produtos.length > 0) {
      for (const p of produtos) {
        await Carrinho.findOrCreate({
          where: { produtoId: p.id },
          defaults: {
            produtoId: p.id,
            qtd: 1,
          },
        });
      }
    }

    console.log("🌱 Carrinho populado com produtos!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao popular carrinho:", err);
    process.exit(1);
  }
}

seedCarrinho();

// seedsPedidos.js
const Pedido = require("./models/Pedido");
const Produto = require("./models/Produto");
require("dotenv").config();

async function seedPedidos() {
  try {
    await Pedido.sequelize.authenticate();
    console.log("✅ Conexão com o banco estabelecida!");

    const produtos = await Produto.findAll({ limit: 2 });

    if (produtos.length > 0) {
      const itens = produtos.map(p => ({
        id: p.id,
        nome: p.nome,
        qtd: 1,
        preco: parseFloat(p.preco), // garantir número
      }));

      const total = itens.reduce((sum, p) => sum + p.preco, 0);

      await Pedido.findOrCreate({
        where: { cliente: "Cliente Teste" },
        defaults: {
          cliente: "Cliente Teste",
          itens,
          total, // agora é número, não string
          status: "pendente",
        },
      });
    }

    console.log("🌱 Pedido de teste criado!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao popular pedidos:", err);
    process.exit(1);
  }
}

seedPedidos();

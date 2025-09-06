const sequelize = require("./models/index");
const Produto = require("./models/Produto");
const Carrinho = require("./models/Carrinho");
const Pedido = require("./models/Pedido");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco bem-sucedida.");

    await sequelize.sync({ alter: true }); // cria ou atualiza tabelas
    console.log("📦 Tabelas sincronizadas com sucesso.");
    process.exit();
  } catch (error) {
    console.error("❌ Erro ao sincronizar:", error);
    process.exit(1);
  }
})();

const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Produto = require("./Produto");

const Carrinho = sequelize.define("Carrinho", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  qtd: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// Relação: cada item de carrinho pertence a um produto
Carrinho.belongsTo(Produto, { foreignKey: "produtoId" });

module.exports = Carrinho;

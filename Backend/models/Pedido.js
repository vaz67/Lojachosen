const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Pedido = sequelize.define("Pedido", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itens: {
    type: DataTypes.JSONB, // guarda lista de itens [{produtoId, qtd, preco}]
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pendente", // pendente, pago, enviado...
  },
});

module.exports = Pedido;

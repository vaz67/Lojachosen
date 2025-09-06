const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Produto = sequelize.define("Produto", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false, // camisetas, camisas, camisolas
  },
});

module.exports = Produto;

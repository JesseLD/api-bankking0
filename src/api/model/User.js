const { DataTypes } = require("sequelize");
const sequelize = require("../instances/mysql");

const User = sequelize.define(
  "User",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    uuid: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    cpf_cnpj: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);

const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  },
  {
    tableName: "Wallet",
    timestamps: false,
  }
);

User.hasOne(Wallet, {
  foreignKey: "id",
});
Wallet.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    return Wallet.sync();
  })
  .then(() => {
    console.log(">[Models] Users Tables sync successful");
  })
  .catch((error) => {
    console.error(">[Models] Error on Users table sync", error);
  });


module.exports = User;
module.exports = Wallet;
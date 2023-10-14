const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    dialect: "mysql",
    port: parseInt(process.env.MYSQL_PORT),
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("> [MySQL] Authentication Success!");
  })
  .catch((err) => {
    console.log("> [MySQL] Authentication Failure");
    console.log(err);
  });

module.exports = sequelize;

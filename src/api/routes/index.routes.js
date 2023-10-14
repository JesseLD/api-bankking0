const { Router } = require("express");
const userRoutes = require("./user.routes");
const transferRoutes = require("./transfer.routes");

const routes = Router();

routes.use("/api/v0", userRoutes);
routes.use("/api/v0", transferRoutes);

routes.use((req, res) => {
  res.sendStatus(404);
});

module.exports = routes;

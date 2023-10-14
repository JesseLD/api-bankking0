const { Router } = require("express");
const { transfer } = require("../controller/user.controller");
const transferRoutes = Router();

transferRoutes.post("/transfer", transfer);
module.exports = transferRoutes;

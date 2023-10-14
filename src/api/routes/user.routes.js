const { Router } = require("express");
const { validateRegister } = require("../auth/validators");
const { create } = require("../controller/user.controller");
const userRoutes = Router();

userRoutes.post("/register", create);

module.exports = userRoutes;

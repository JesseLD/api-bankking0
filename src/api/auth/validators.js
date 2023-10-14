const { body } = require("express-validator");

exports.validateRegister = [
  body("name").isString().withMessage("Invalid Name!"),
  body("cpf_cnpj")
    .isString()
    .isLength({ min: 11 })
    .withMessage("Invalid CPF or CNPJ!"),
  body("email").isEmail().withMessage("Invalid Email!"),
  body("password")
    .isString().isLength({ min: 6 })
    .withMessage("Invalid Password!"),
];
exports.validateLogin = [
  body("email").isEmail().withMessage("Invalid Email!"),
  body("password")
    .isString().isLength({ min: 6 })
    .withMessage("Invalid Password!"),
];

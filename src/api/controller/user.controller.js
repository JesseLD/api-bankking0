const dotenv = require("dotenv");
const User = require("../model/User");
const Wallet = require("../model/User");
const uuid = require("uuid").v4;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.create = async (req, res) => {
  const errors = validationResult(req);

  const { name, cpf_cnpj, password, email } = req.body;

  if (errors.isEmpty()) {
    if (!await exists(email)) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUUID = uuid();

      try {
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          cpf_cnpj,
          type: getType(cpf_cnpj),
          uuid: newUUID,
        });
        await Wallet.create({
          user_id: user.id,
          balance: 0,
        });

        res.json({ success: "Created" });
      } catch (err) {
        res.sendStatus(500);
        console.log("Error on user creating: ", err);
      }
    }
  } else {
    res.status(400).json({ error: errors });
  }
};

exports.transfer = async (req, res) => {
  const errors = validationResult(req);

  const { payer, payee, value } = req.body;

  if (errors.isEmpty()) {
    if (payer != payee) {
      const payerUser = await User.findOne({ where: { cpf_cnpj: payer } });
      const payeeUser = await User.findOne({ where: { cpf_cnpj: payee } });

      if (payeeUser && payerUser) {
        const payerUserWallet = await Wallet.findOne({
          where: { user_id: payerUser.id },
        });
        const payeeUserWallet = await Wallet.findOne({
          where: { user_id: payeeUser.id },
        });

        if (payerUserWallet.balance > 0) {
          const NEW_PAYER_BALANCE = parseFloat(value - payerUserWallet.balance);
          const NEW_PAYEE_BALANCE = parseFloat(value + payeeUserWallet.balance);

          //BEGIN TRANSACTION

          try {
            await Wallet.update(
              { balance: NEW_PAYER_BALANCE },
              {
                where: {
                  user_id: payerUser.id,
                },
              }
            );
            await Wallet.update(
              { balance: NEW_PAYEE_BALANCE },
              {
                where: {
                  user_id: payeeUser.id,
                },
              }
            );
            console.log("Transaction Finished!");
          } catch (err) {
            console.log("Transaction Failed!");
            console.log(err);
          }
        }
        //END TRANSACTION
      } else {
        res.sendStatus(404);
      }
    } else {
      res.status(400).json({ error: "You cannot send money to yourself!" });
    }
  } else {
    res.status(400).json({ error: errors });
  }
};

async function exists(email) {
  const user = await User.findOne({ email });
  if (uuid) {
    return user;
  } else {
    return false;
  }
}

function getType(cpf_cnpj) {
  let type = "PF";
  if (cpf_cnpj > 11) {
    type = "PJ";
    return type;
  } else {
    return type;
  }
}

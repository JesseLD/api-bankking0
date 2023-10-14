const express = require("express");
const config = require("./config");
const path = require("path");
const cors = require("cors");
const routes = require("../api/routes/index.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes)


module.exports = app
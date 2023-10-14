const app = require("./config/express");
const config = require("./config/config");



const server = app.listen(config.port,()=>{
  console.log(`> [server] Server listening on ${config.port}`)
})
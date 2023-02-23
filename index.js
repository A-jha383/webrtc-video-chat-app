const express = require("express");
const socket = require("socket.io");
const app = express();

let server = app.listen(4000, () => {
  console.log("welcome to chat server!!");
});
app.use(express.static("public"));

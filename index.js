const express = require("express");
const socket = require("socket.io");
const app = express();

let server = app.listen(4000, () => {
  console.log("welcome to chat server!!");
});
app.use(express.static("public"));

const io = socket(server);
io.on("connection", (socket) => {
  console.log("Socket id :" + socket.id);
  socket.on("join", (roomname) => {
    var rooms = io.sockets.adapter.rooms;
    //console.log(rooms);
    var room = rooms.get(roomname);
    if (room === undefined) {
      console.log("Room created");
      socket.join(roomname);
      socket.emit("created");
    } else if (room.size == 1) {
      console.log("Room join");
      socket.join(roomname);
      socket.emit("joined");
    } else {
      console.log("Romm is full::");
      socket.emit("full");
    }
    //console.log("Romms::", rooms);
  });


  socket.on("ready", function (roomName) {
    console.log("On Ready::", roomName);
    socket.broadcast.to(roomName).emit("ready");
  });

  socket.on("candidate", function (candidate, roomName) {
    console.log("On Candidate::", roomName);
    socket.broadcast.to(roomName).emit("candidate", candidate);
  });

  socket.on("offer", function (offer, roomName) {
    console.log("On Offer::", roomName);
    console.log(offer);
    socket.broadcast.to(roomName).emit("offer", offer);
  });

  socket.on("answer", function (answer, roomName) {
    console.log("On answer::", roomName);
    socket.broadcast.to(roomName).emit("answer", answer);
  });
  
  socket.on("leave", function (roomName) {
    console.log("On leave::", roomName);
    socket.leave(roomName);
    socket.broadcast.to(roomName).emit("leave");
  });
});

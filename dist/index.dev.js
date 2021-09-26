"use strict";

var http = require('http');

var express = require('express');

var socketio = require('socket.io');

var path = require('path');

var cors = require('cors');

var _require = require('./backend/user'),
    addUser = _require.addUser,
    removeUser = _require.removeUser,
    getUser = _require.getUser,
    getUsersInRoom = _require.getUsersInRoom;

var router = require('./backend/router');

var app = express();
var server = http.createServer(app);
var io = socketio(server);
app.use(cors());
app.use(router);
io.on('connect', function (socket) {
  socket.on('join', function (_ref, callback) {
    var name = _ref.name,
        room = _ref.room;

    var _addUser = addUser({
      id: socket.id,
      name: name,
      room: room
    }),
        error = _addUser.error,
        user = _addUser.user;

    if (error) return callback(error);
    socket.join(user.room);
    socket.emit('message', {
      user: 'admin',
      text: "".concat(user.name, ", welcome to room ").concat(user.room, ".")
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: "".concat(user.name, " has joined!")
    });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
    callback();
  });
  socket.on('sendMessage', function (message, callback) {
    var user = getUser(socket.id);
    io.to(user.room).emit('message', {
      user: user.name,
      text: message
    });
    callback();
  });
  socket.on('disconnect', function () {
    var user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: "".concat(user.name, " has left.")
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});
server.listen(process.env.PORT || 5000, function () {
  return console.log("Server has started.");
});

if (process.env.NODE_ENV === "production") {
  console.log("production Hi");
  app.use(express["static"]("frontend/build"));
  app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
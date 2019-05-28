import express from "express";
import http from "http";
import io from "socket.io";

const app = express();

const server = http.createServer(app);

const socket = io(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/test.html');
});

app.get("/:roomId", (req, res) => {
    console.log(req.params.roomId);
});

socket.on("connection", socket => {
  console.log("user connected.");
});

server.listen(3000, () => {
  console.log("Listening on port: 3000");
});

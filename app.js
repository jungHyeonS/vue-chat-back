const express = require('express');
const app = express();
const http = require('http');
const port = 3000;
const cors = require('cors');
require("dotenv").config();
app.use(express.json()); //json 형태로 parsing
app.use(express.urlencoded( {extended : false } )); 
app.use(cors());
const routes = require("./router/"); // index.js 는 / 와 같으므로 생략 가능
app.use(routes) // use 는 경로에 대한 확장성을 의미한다.
// var router = require('./router/main')(app);


let Room = require("./models/room")

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      allowedHeaders: ["extra-custrom-headeres"],
      credentials: true
    },
    allowEIO3: true 
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("roomList",async (data)=>{
        console.log("roomList",data);
        const room = new Room();
        let roomList = await room.roomList();
        console.log(roomList);
        // console.log(socket.id);
        socket.emit("sendRoomList",{
            list : roomList.list
        })
    })
});


server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
  
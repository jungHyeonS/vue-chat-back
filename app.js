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
let Chat = require("./models/chat")
let Common = require("./models/common");

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


let socketToRoom = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    /**
     * @description 방 리스트 소켓
     */
    socket.on("roomList",async (data)=>{
        const room = new Room();
        let roomList = await room.roomList(data.roomName);
        io.to(socket.id).emit("sendRoomList",{
            list : roomList.list
        })
    })


    /**
     * @description 방 입장 소켓
     */
    socket.on("joinRoom",async (data)=>{
        if(socketToRoom[data.roomIdx]){
            socketToRoom[data.roomIdx].push({socket : socket.id})
        }else{
            socketToRoom[data.roomIdx] = [
                {socket : socket.id}
            ]
        }

        const room = new Room();
        const chat = new Chat();
        // const common = new Common();
        await room.isRoomCheck(data.roomIdx,data.userIdx,socket.id)

        socket.join(data.roomIdx.toString())
        io.to(socket.id).emit("joinRoomSuccess",{
            roomIdx : data.roomIdx
        })

        let chatList = await chat.chatList(data.roomIdx);
        io.sockets.in(data.roomIdx.toString()).emit("getChatList",{
            chatList : chatList
        })
      
    });

    socket.on("outRoom",async (data)=>{
        // console.log("outRoom",socketToRoom[data.roomIdx])

        let index = socketToRoom[data.roomIdx].findIndex((item) => item.socket == socket.id);
        console.log(index);
        socketToRoom[data.roomIdx].splice(index,1);
        socket.leave(data.roomIdx.toString())
        // console.log(socketToRoom[data.roomIdx])

    });


    /**
     * @description 메세지 전송 소켓
     */
    socket.on("sendMessage", async (data)=>{
        let input = data.input;
        input.userSocket = socket.id;
        const chat = new Chat();
        let chatIdx = await chat.sendMessage(input,"N");
        if(chatIdx){
            let chatList = await chat.chatList(input.roomIdx);
            console.log("chatList",chatList)
            io.sockets.in(input.roomIdx.toString()).emit("getChatList",{
                chatList : chatList
            })
        }
    })
});


server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
  
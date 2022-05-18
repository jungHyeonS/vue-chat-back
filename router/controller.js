var Auth = require("../models/auth");
let Room = require("../models/room")

//회원가입 컨트롤러
exports.join = async function (req, res) {
    let input = req.body;
    const auth = new Auth();
    let authResult = await auth.join(input);
    let result = {
        err : 0,
        errMsg : ""
    }
    if(!authResult){
        result.err = 100;
        result.errMsg = "회원가입 실패";
    }
    res.json(result);
}


//로그인 컨트롤러
exports.login = async function(req,res){
    let input = req.body;

    const auth = new Auth();
    let loginResult = await auth.login(input); 
    res.json(loginResult);
}

//방생성
exports.addRoom = async function(req,res){
    let input = req.body;
    const token = req.token;
    input.userIdx = token.idx
    const room = new Room();
    let addRoomResult = await room.addRoom(input);
    res.json(addRoomResult);
}

//방 리스트
exports.roomList = async function(req,res){
    const room = new Room();
    let roomList = await room.roomList();
    res.json(roomList);
}
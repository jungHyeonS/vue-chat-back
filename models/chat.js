const mysql = require("../config/db");
class Chat{
    constructor(){

    }

    sendMessage(params){
        return new Promise((resolve,reject)=>{
            const sql = "insert into chat(roomIdx,content,userSocket,userIdx) values (?,?,?,?)";
            let param = [params.roomIdx,params.content,params.userSocket,params.userIdx];
            mysql.query(sql,param,(err,rows,fields)=>{
                if(err){
                    reject(0)
                }else{
                    resolve(rows.insertId);
                }
            })
        })
    }

    chatList(roomIdx){
        return new Promise((resovle,reject)=>{
            const sql = `select c.idx,roomIdx,content,userSocket,userIdx,createDate,u.nickname  from chat c
            left join user u on u.idx = c.userIdx  where c.roomIdx = ?`;
            let param = [roomIdx]
            mysql.query(sql,param,async(err,rows,fiedls)=>{
                if(err){
                    reject(err)
                }else{
                    resovle(rows)
                }
            })
        })
    }
}
module.exports = Chat
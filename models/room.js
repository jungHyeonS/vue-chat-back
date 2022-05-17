const mysql = require("../config/db");
class Room{
    constructor(){

    }


    async addRoom(params){
        let result = {
            err : 0,
            errMsg : ""
        }
        return new Promise((resolve,reject)=>{
            const sql = "insert into room(roomName,createIdx) values (?,?)";
            let param = [params.roomName,params.userIdx];
            mysql.query(sql,param,(err,rows,fields)=>{
                if(err){
                    reject(100)
                }else{
                    resolve(result)
                }
            })
        })
    }
}
module.exports = Room;
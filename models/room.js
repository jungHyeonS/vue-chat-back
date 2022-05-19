const mysql = require("../config/db");
class Room{
    constructor(){

    }



    /**
     * @description 방생성
     * @param {*} params 
     * @returns result
     */
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

    async roomList(roomName){
        let result = {
            err : 0,
            errMsg : "",
            list : []
        }
        return new Promise((resolve,reject)=>{
            let sqlIf = "";
            let param = [];
            if(roomName !== ""){
                sqlIf += " and roomName like ?"
                roomName = `%${roomName}%`
                param.push(roomName)
            }

            const sql = `select idx,roomName,createIdx,createDate from room where isDel = 'N' ${sqlIf}`
            mysql.query(sql,param,async (err,rows,fields)=>{
                if(err){
                    reject(err)
                }else{
                    result.list = rows;
                    resolve(result)
                }
            });
        })
    }
}
module.exports = Room;
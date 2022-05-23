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

    /**
     * @description 방 리스트
     * @param {*} roomName 
     * @returns 
     */
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

    isRoomCheck(roomIdx,userIdx){
        return new Promise((resolve,reject)=>{
            const sql = `select riu.isQuit  from roomIsUser riu where riu.roomIdx = ? and userIdx = ?`
            let param = [roomIdx,userIdx]
            console.log(param);
            mysql.query(sql,param,async (err,rows,fields)=>{
                if(err){
                    reject(err);
                }else{
                    await this.replaceRoomIsUser(roomIdx,userIdx,"N")
                    // console.log(rows);
                    // let isQuit = "N";
                    // if(!rows.length){
                    //     isQuit = "N"
                    // }else{
                    //     if(rows[0].isQuit == "Y"){
                    //         isQuit = "N"
                    //     }
                    // }
                }
            })
        })
    }
    replaceRoomIsUser(roomIdx,userIdx,isQuit){
        return new Promise((resolve,reject)=>{
            const sql = "replace into roomIsUser set roomIdx = ?, userIdx = ?, isQuit = ?";
            let param = [roomIdx,userIdx,isQuit]
            mysql.query(sql,param,(err,rows,fiedls)=>{
                if(err){
                    reject(0)
                }else{
                    console.log(rows.insertId)
                }
            })
        })
    }
}
module.exports = Room;
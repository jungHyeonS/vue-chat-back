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


    /**
     * @description 선택한 방 에 로그인한 유저가 있는지 없는지 체크
     * @param {int} roomIdx 
     * @param {int} userIdx 
     * @returns 
     */
    isRoomCheck(roomIdx,userIdx){
        return new Promise((resolve,reject)=>{
            const sql = `select riu.idx,riu.isQuit  from roomIsUser riu where riu.roomIdx = ? and userIdx = ?`
            let param = [roomIdx,userIdx]
            console.log(param);
            mysql.query(sql,param,async (err,rows,fields)=>{
                if(err){
                    reject(err);
                }else{
                    // console.log("rows",rows.idx);
                    let result = {
                        isJoin : "Y"
                    }
                    if(!rows.length){
                        await this.replaceRoomIsUser(0,roomIdx,userIdx,"N")
                    }else{
                        if(rows[0].isQuit == "Y"){
                            await this.replaceRoomIsUser(rows[0].idx,roomIdx,userIdx,"N")
                        }else{
                            result.isJoin = "N";
                        }
                    }
                    resolve(result)
                }
            })
        })
    }


    /**
     * @description 방 접속 여부에 따라 데이터 업데이트
     * @param {int} idx 
     * @param {int} roomIdx 
     * @param {int} userIdx 
     * @param {char} isQuit 
     * @returns 
     */
    replaceRoomIsUser(idx,roomIdx,userIdx,isQuit){
        return new Promise((resolve,reject)=>{
            let param = []
            let sql = "";
            if(idx === undefined){
                sql = "replace into roomIsUser set roomIdx = ?, userIdx = ?, isQuit = ?";
                param = [roomIdx,userIdx,isQuit]    
            }else{
                sql = "replace into roomIsUser set idx = ? , roomIdx = ?, userIdx = ?, isQuit = ?";
                param = [idx,roomIdx,userIdx,isQuit]    
            }
            
            mysql.query(sql,param,(err,rows,fiedls)=>{
                if(err){
                    reject(0)
                }else{
                    resolve(rows.insertId)
                }
            })
        })
    }
}
module.exports = Room;
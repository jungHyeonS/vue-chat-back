const mysql = require("../config/db");
class Common{
    constructor(){

    }

    findByUser(userIdx){
        return new Promise((resolve,reject)=>{
            const sql = "select u.idx,u.id,u.nickname  from user u where u.idx = ?";
            let param = [userIdx];
            mysql.query(sql,param,(err,rows,fields)=>{
                if(err){
                    reject(100)
                }else{
                    let user = {
                        idx : rows[0].idx,
                        id : rows[0].id,
                        nickname : rows[0].nickname
                    }
                    resolve(user);
                }
            })
        })
    }
}
module.exports = Common;
const mysql = require("../config/db");
const Encryption = require("./encryption");
class Auth {
    constructor() {
    }

    /**
     * @description 유저 회원가입
     * @param {*} params 
     * @returns user table index
     */
    async join (params) {
        let encry = new Encryption();
        const pass = await encry.createPassword(params.password);
        return new Promise((resolve,reject) => {
            const sql = "insert into user(id,password,nickname,salt) values (?,?,?,?)";
            let param = [params.id,pass.password,params.nickname,pass.salt];
            mysql.query(sql,param,(err,rows,fields) => {
                if(err){
                    reject(0)
                }else{
                    resolve(rows.insertId);
                }
            })
        })
    }
}
module.exports = Auth;
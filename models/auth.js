const mysql = require("../config/db");
const Encryption = require("./encryption");
const Jwt = require("./jwt")
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


    /**
     * @description 로그인
     * @param {*} param 
     * @returns checkPass
     */
    async login(param){
        let encry = new Encryption();
        const jwtToken = new Jwt();
        let result = {
            err : 0,
            errMsg : ""
        }
        return new Promise((resolve,reject)=>{
            try{
                const sql = "select idx,id,password,salt,nickname from user where id = ?";
                mysql.query(sql,[param.id],async (err,rows,fields)=>{
                    if(err){
                        reject(err);
                    }else{
                        // console.log(rows.length);
                        if(rows.length){
                            let hasspass = await encry.checkPassword(param.pass,rows[0].salt);
                            if(rows[0].password === hasspass){
                                result.err = 0;
                                result.userIdx = rows[0].idx
                                result.accessToken = await jwtToken.tokenSign(rows[0].idx,rows[0].id,rows[0].nickname);
                            }else{
                                result.err = 101;
                                result.errMsg = "비밀번호를 확인해주세요";
                            }
                        }else{
                            result.err = 102;
                            result.errMsg = "아이디를 확인해주세요.";
                        }
                        
                        resolve(result)
                    }
                });
            }catch(err){
                console.log(err);
            }
        })
    }
}
module.exports = Auth;
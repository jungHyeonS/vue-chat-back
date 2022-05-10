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


    /**
     * @description 로그인
     * @param {*} param 
     * @returns checkPass
     */
    async login(param){
        let encry = new Encryption();
        return new Promise((resolve,reject)=>{
            try{
                const sql = "select id,password,salt from user where id = ?";
                mysql.query(sql,[param.id],async (err,rows,fields)=>{
                    if(err){
                        reject(err);
                    }else{
                        let dataList = [];
                        for (let data of rows){
                            dataList.push({
                                id : data.id,
                                pass : data.password,
                                salt : data.salt
                            });
                        };
                        let hasspass = await encry.checkPassword(param.pass,dataList[0].salt,);

                        let checkPass = false;
                        if(dataList[0].pass === hasspass){
                            checkPass = true;
                        }else{
                            checkPass = false
                        }
                        resolve(checkPass)
                    }
                });
            }catch(err){
                console.log(err);
            }
        })
    }
}
module.exports = Auth;
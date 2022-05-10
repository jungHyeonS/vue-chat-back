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


    async login(param){
        let encry = new Encryption();
        let reulst = await encry.checkPassword("aa","bb","ss");
        // try{
        //     const sql = "select id,password,salt from user where id = ?";
        //     mysql.query(sql,[param.id],(err,rows,fields)=>{
        //         if(err){
        //             reject(err);
        //         }else{
        //             let dataList = [];
        //             for (let data of rows){
        //                 dataList.push({
        //                     id : data.id,
        //                     pass : data.password,
        //                     salt : data.salt
        //                 });
        //             };
        //             let reulst = await encry.checkPassword(param.pass,dataList[0].salt,dataList[0].pass);
        //         }
        //     });
        // }catch(err){
        //     console.log(err);
        // }
        // return new Promise((resolve,reject)=>{
        //     const sql = "select id,password,salt from user where id = ?";
        //     mysql.query(sql,[param.id],(err,rows,fields)=>{
        //         if(err){
        //             reject(err);
        //         }else{
        //             let dataList = [];
        //             for (let data of rows){
        //                 dataList.push({
        //                     id : data.id,
        //                     pass : data.password,
        //                     salt : data.salt
        //                 });
        //             };
        //             encry.checkPassword(param.pass,dataList[0].salt,dataList[0].pass).then((res)=>{
        //                 resolve(res);
        //             })
                    
        //         }
        //     })
        // })
        
    }
}
module.exports = Auth;
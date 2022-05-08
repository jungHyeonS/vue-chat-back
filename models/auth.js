const mysql = require("../config/db");
const Encryption = require("./encryption");
class Auth {
    constructor() {
    }
    join (params) {
        let encry = new Encryption();
        encry.createPassword("abc").then((res)=>{
            console.log("encryption : ",res);
        }).catch((err)=>{
            console.log(err);
        });
        // encry.createPassword("abc");
        // console.log(params)
        // mysql.query("SELECT * FROM user",(err,res)=>{
        //     if (err) {
        //         console.log("error : ", err);
        //         // result(null, err);
        //       } else {
        //         console.log("employees : ", res);
        //         // result(null, res);
        //       }
        // });
    }
}
module.exports = Auth;
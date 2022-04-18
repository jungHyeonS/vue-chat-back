const mysql = require("../config/db");
class Auth {
    constructor() {
    }
    join () {
        mysql.query("SELECT * FROM user",(err,res)=>{
            if (err) {
                console.log("error: ", err);
                // result(null, err);
              } else {
                console.log("employees : ", res);
                // result(null, res);
              }
        });
    }
}
module.exports = Auth;
const mysql = require("mysql");

const conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "zaqxsw12",
    database : "chat"
})

conn.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("DB Connect");
});

module.exports = conn;
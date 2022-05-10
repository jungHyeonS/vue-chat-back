const crypto = require('crypto');
class Encryption {
    constructor() {
    }
    /**
     * @description salt값 생성
     * @returns salt
     */
    async createRandomSalt(){
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(64,(err,buf)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(buf.toString("hex"));
                }
            })
        })
    }

    /**
     * 
     * @param {*} userPassword 
     * @returns password
     */
    async createPassword(userPassword){
        let salt = await this.createRandomSalt();
        console.log("Salt : ",salt);
        return new Promise((resolve,reject)=>{
            //키스트림 100번반복
            crypto.pbkdf2(userPassword,salt,100,64,"sha512",(err,key)=>{
                if(err){
                    reject(err)
                }else{
                    let result ={
                        salt : salt,
                        password : key.toString("hex")
                    }
                    resolve(result);
                }
            })
        })
    }

    async checkPassword(inputPass,salt,userPass){
        return new Promise((resolve,reject)=>{
            crypto.pbkdf2(inputPass,salt,100,64,"sha512",(err,key)=>{
                if(err){
                    reject(err);
                }else{
                    let result = {
                        err : 0
                    }
                    if(key.toString("hex") === userPass){
                        resolve(result)
                    }else{
                        result.err = 101;
                        reject(result);
                    }
                    // else{
                    //     reject(0);
                    // }
                }
            });
        })
        
        
    }
}
module.exports = Encryption;
const jwt = require('jsonwebtoken');
const option = require("../config/jwt_key").option
class Jwt{
    constructor(){

    }

    async tokenSign(idx,id,nickname){
        const data = {
            idx:idx,
            id : id,
            nickname : nickname
        }
        const token = jwt.sign(data,process.env.SECRETKEY,option) ;
        return token;
    }

    async verify(token){
        let verifyToken
        try{
            verifyToken = jwt.verify(token,process.env.SECRETKEY)
        }catch(err){
            if (err.message === 'jwt expired') {
                //토큰 만료
                return 1;
            } else if (err.message === 'invalid token') {
                //유효하지 않은 토큰
                return 2;
            } else {
                //유효하지 않은 토큰
                return 2;
            }
        }
        return verifyToken;
    }
}
module.exports = Jwt;
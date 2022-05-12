const jwt = require('jsonwebtoken');
const secretKey = require("../config/jwt_key").secretKey;
const option = require("../config/jwt_key").option
class Jwt{
    constructor(){

    }

    async tokenSign(id,nickname){
        const data = {
            id : id,
            nickname : nickname
        }
        const token = jwt.sign(data,secretKey,option) ;
        return token;
    }
}
module.exports = Jwt;
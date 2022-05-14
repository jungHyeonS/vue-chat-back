
const Jwt = require("../models/jwt")
const verify = {
    tokenVerify:async(req,res,next)=>{
        const jwtToken = new Jwt();
        const headerToken = req.headers.authorization;
        if(headerToken == "" || headerToken === undefined){
            res.status(400).json({status: 400, message: "invalid token"})
        }else{
            const bearer = headerToken.split(" ");
            const token = bearer[1];
            let verify = await jwtToken.verify(token);
            if(verify == 1){
                return res.status(400).json({status: 400, message: "token expired"})
            }else if(verify == 2){
                return res.status(400).json({status: 400, message: "invalid token"})
            }else if(verify.idx === undefined){
                return res.status(400).json({status: 400, message: "invalid token"})
            }
            next();
        }
    }
}
module.exports = verify;
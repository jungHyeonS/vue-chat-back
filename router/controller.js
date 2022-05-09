var Auth = require("../models/auth");
exports.join = async function (req, res) {
    let input = req.body;
    let auth = new Auth();
    let authResult = await auth.join(input);
    let result = {
        err : 0,
        errMsg : ""
    }
    if(authResult){
        res.json(result);
    }else{
        result.err = 100;
        result.errMsg = "회원가입 실패";
        res.json(result);
    }
}
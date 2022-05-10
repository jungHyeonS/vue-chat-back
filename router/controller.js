var Auth = require("../models/auth");

//회원가입 컨트롤러
exports.join = async function (req, res) {
    let input = req.body;
    const auth = new Auth();
    let authResult = await auth.join(input);
    let result = {
        err : 0,
        errMsg : ""
    }
    if(!authResult){
        result.err = 100;
        result.errMsg = "회원가입 실패";
    }
    res.json(result);
}


//로그인 컨트롤러
exports.login = async function(req,res){
    let result = {
        err : 0,
        errMsg : ""
    }
    let input = req.body;

    const auth = new Auth();
    let loginResult = await auth.login(input); 

    if(loginResult){
        result.errMsg = "로그인 성공";
    }else{
        result.err = 101;
        result.errMsg = "비밀번호를 다시 입력해주세요.";
    }
    res.json(result);
    // console.log(input);
    // res.json(result);
}
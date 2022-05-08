var Auth = require("../models/auth");
exports.join = function (req, res) {
    res.end("Hello World")
    let input = req.body;
    let auth = new Auth();
    auth.join(input);
    // var sub = calc.sum();
    // console.log(sub)
}
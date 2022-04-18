var Auth = require("../models/auth");
exports.join = function (req, res) {
    res.end("Hello World")
    var post = req.body;
    console.log(post);
    // var calc = new Auth(5,10);
    // var sub = calc.sum();
    // console.log(sub)
}
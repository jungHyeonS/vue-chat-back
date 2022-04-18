var Auth = require("../models/auth");
exports.join = function (req, res) {
    res.end("Hello World")
    var post = req.body;
    console.log(post);
    var auth = new Auth();
    auth.join();
    // var sub = calc.sum();
    // console.log(sub)
}
// module.exports = function(app)
// {
//     app.get('/', function(req, res){
//        console.log("root");
//         res.json({
//          success: "root",
//         });
//     });

//     app.post('/join', function(req, res){
//         // var post = req.body;
// 	    // console.log(post)
//         // console.log("join");
//         // res.json({
//         //     success: "join",
//         // });
//         let joinInput = req.body;
//         console.log(joinInput);
//         res.json({
//             success: true,
//         });
//     });
// }
const router = require("express").Router();
const controller = require("./controller");
router.post("/join", controller.join);
router.get('/', function(req, res){
    console.log("root");
     res.json({
      success: "root",
     });
 });
 module.exports = router;
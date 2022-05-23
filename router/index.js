const router = require("express").Router();
const controller = require("./controller");
const tokenVerify = require("../middleware/verify").tokenVerify

router.post("/join", controller.join);
router.post("/login",controller.login)
router.get("/roomList",tokenVerify,controller.roomList)
router.post("/addRoom",tokenVerify,controller.addRoom)
router.get("/chatList/:roomIdx",tokenVerify,controller.chatList)

router.get('/', function(req, res){
    console.log("root");
     res.json({
      success: "root",
     });
 });
 module.exports = router;
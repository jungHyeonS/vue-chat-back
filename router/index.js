const router = require("express").Router();
const controller = require("./controller");

router.post("/join", controller.join);
router.post("/login",controller.login)

router.get('/', function(req, res){
    console.log("root");
     res.json({
      success: "root",
     });
 });
 module.exports = router;
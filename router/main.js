module.exports = function(app)
{
    app.get('/', function(req, res){
       console.log("root");
        res.json({
         success: "root",
        });
    });

    app.post('/join', function(req, res){
        // var post = req.body;
	    // console.log(post)
        // console.log("join");
        // res.json({
        //     success: "join",
        // });
        let joinInput = req.body;
        console.log(joinInput);
        res.json({
            success: true,
        });
    });
}
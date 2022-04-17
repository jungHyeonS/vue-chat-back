const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json()); //json 형태로 parsing
app.use(express.urlencoded( {extended : false } )); 
app.use(cors());
var router = require('./router/main')(app);

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
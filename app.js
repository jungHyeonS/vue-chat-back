const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
require("dotenv").config();
app.use(express.json()); //json 형태로 parsing
app.use(express.urlencoded( {extended : false } )); 
app.use(cors());
const routes = require("./router/"); // index.js 는 / 와 같으므로 생략 가능
app.use(routes) // use 는 경로에 대한 확장성을 의미한다.
// var router = require('./router/main')(app);

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
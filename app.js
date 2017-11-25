var express = require("express");
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var morgan = require('morgan');

var router = require("./router");

app.use(morgan('dev')); // 打印到控制台
app.use(bodyParser.json()); // json

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); //让options请求快速返回
    } else {
        next();
    }
});

app.post("/creat",router.creat);        // 创建计划

app.post("/getList",router.getList);    // 获取总列表

app.post("/deletePlan",router.deletePlan);      // 删除计划

http.listen(3000);

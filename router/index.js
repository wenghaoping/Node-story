/**
 * Created by Admin on 2017/11/24.
 */
var formidable = require("formidable");
var db = require("../models/db.js");
var path = require("path");
var fs = require("fs");
var ObjectID = require('mongodb').ObjectID
// 创建数据
exports.creat = function(req, res, next) {
    //得到表单之后做的事情
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files){
        //得到表单之后做的事情
        var avatar = fields.avatar;
        var name = fields.name;
        var introduce = fields.introduce;//二次验证密码
        var date = fields.date;
        console.log(fields);
        //如果我们需要的字段不存在，返回前端信息
        if(!avatar || !name || !introduce || !date) {
            res.send({code:-1,msg:"params missed"});
            return;
        }
        //现在可以证明，用户名没有被占用
        db.insertOne("plan", {
            "avatar": avatar,
            "name": name,
            "introduce": introduce,
            "date": date,
        }, function (err, result) {
            if (err) {
                res.send({code:-3,msg:"服务器错误"}); //服务器错误
                return;
            }
            res.send({code:1,msg:"创建成功"}); //注册成功，写入session
        })
    });
}

// 获取列表
exports.getList = function(req, res, next) {
    db.find("plan",{},{"sort":{_id:-1}},function(err,result){
        if (err) {
            res.send({code:-3,msg:"service err"}); //服务器错误
            return;
        }
        res.send({code:1, result: result});
    });
}

// 删除计划
exports.deletePlan = function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        let id = new ObjectID(fields._id);// 得到id
        console.log(id);
        db.deleteMany("plan", {_id: id},function (err, results) {
            if (err) {
                res.send({result:-3,msg:"service err"}); //服务器错误
                return;
            }
            res.send({result:1}); //注册成功，
        });
    });
}
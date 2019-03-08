const Notice = require('../models/notice')
const fs = require('fs')
const logControllers = require('../models/log')

exports.notice_create = (req, res, next) => {
    Notice.create({
        date:req.body.date,
        title: req.body.title,
        content: req.body.content,
        allStaff: req.body.allStaff,
        leftStaff:req.body.allStaff
    })
    .then(doc => {
        if(doc){
            res.send({
                code:0
            })
        } else {
            res.send({
                code:1
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.notice_user_read = (req, res, next) => {
    Notice.findOne({_id:req.body.notice_id,leftStaff:{$all:[req.body.userName]}})
    .then(doc => {
        if(doc){
            doc.leftStaff.remove(req.body.userName)
            doc.save()
            res.send({
                code:0
            })
        }else{
            res.send({
                code:1
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.notice_panel_get = (req, res, next) => {
    Notice.find()
    .then(doc => {
        if(doc.length != 0){
            res.send({
                code:0,
                doc:doc
            })
        }else{
            res.send({
                code:1
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.notice_client_get = (req, res, next) => {
    Notice.find({
        isFinish:false,
        leftStaff:{$all:[req.body.userName]}
    },{allStaff:0,isFinish:0,leftStaff:0})
    .then(doc => {
        console.log(doc)
        if(doc.length != 0){
            res.send({
                code:0,
                doc:doc
            })
        }else{
            res.send({
                code:1
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.notice_client_get_all = (req, res, next) => {
    Notice.find({allStaff:{$all:[req.body.userName]}})
    .sort({date:-1})
    .limit(10)
    .skip(10 * (req.body.pageNow - 1))
    .then(doc => {
        console.log(doc)
        if(doc.length != 0){
            res.send({
                code:0,
                doc:doc
            })
        }else{
            res.send({
                code:1
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}
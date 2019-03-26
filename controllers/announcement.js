const Announcement = require('../models/announcement')
const fs = require('fs')

//add and edit
exports.notice_update = (req, res, next) => {
    Announcement
        .findOne()
        .then(doc => {
            if(doc){
                if(req.file){
                    doc.image = req.file.path
                }else if(req.body.image === 'oldPic'){
                    console.log('使用旧照片')
                    console.log(req.body.image)
                }else{
                    doc.image = null
                }
                if(req.body.text){
                    doc.text = req.body.text
                }else{
                    doc.text = null
                }
                if(req.body.textEN){
                    doc.textEN = req.body.textEN
                }else{
                    doc.textEN = null
                }
                doc.date = req.body.date
                doc.isShow = req.body.isShow
                doc.save()
                    .then(saveDoc => {
                        if(saveDoc){
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
            }else{
                Announcement
                    .create({
                        date: req.body.date,//生成时间
                        image: req.file.path,//提交的照片
                        text: req.body.text,//提交的文字
                        isShow: req.body.isShow//是否展示
                    })
                    .then(newCreateDoc => {
                        if(newCreateDoc){
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
                            error:err,
                            code:2
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                error:err,
                code:2
            })
        })
}

//find
exports.notice_Find = (req, res, next) => {
    Announcement
        .findOne({},{date:0})
        .then(doc => {
            if(doc){
                res.send({
                    doc:doc,
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
                error:err,
                code:2
            })
        })
}

exports.client_Find = (req, res, next) => {
    Announcement
        .findOne({isShow:true},{date:0})
        .then(doc => {
            console.log(doc)
            if(doc){
                res.send({
                    code:0,
                    image:doc.image,
                    text:doc.text,
                    textEN:doc.textEN
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
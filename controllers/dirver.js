const mongoose = require('mongoose')
const Product = require('../models/dirver')
const bcrypt = require('bcryptjs')

exports.dirvers_get_all = (req, res, next) => {
    Product.find()
        .then((doc) => {
            res.send(doc)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                error: err
            })
        })
}

exports.dirvers_post_all = (req, res, next) => {
    Product.find()
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .then((doc) => {
            Product.count()
                .then(item => {
                    res.send({
                        msg: '计数成功',
                        code: 0,
                        count: item,
                        doc: doc
                    })
                })
                .catch(err => {
                    res.send({
                        msg: '计数时服务器发生错误',
                        error: err
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                error: err
            })
        })
}

exports.dirvers_create_product = (req, res, next) => {
    Product.find({ 'dirverid': req.body.dirverid })
        .then((doc) => {
            if (doc.length != 0) {
                res.send({
                    code: 1,
                    msg: '此准证号码已存在'
                })
            } else {
                Product.find({ 'dirverphone': req.body.dirverphone })
                    .then((item) => {
                        if (item.length != 0) {
                            res.send({
                                code: 1,
                                msg: '此电话号已存在'
                            })
                        } else {
                            Product.find({ 'dirverusername': req.body.dirverusername })
                                .then((user) => {
                                    if (user.length != 0) {
                                        res.send({
                                            code: 1,
                                            msg: '此用户名已存在'
                                        })
                                    } else {
                                        let psw = req.body.dirverpsw
                                        req.body.dirverpsw = bcrypt.hashSync(psw)
                                        Product.create(req.body)
                                            .then((doc) => {
                                                console.log(doc)
                                                res.status(200).json({
                                                    code: 0,
                                                    msg: '添加成功'
                                                })
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                                res.send({
                                                    code: 2,
                                                    msg: '添加时出现错误',
                                                    error: err
                                                })
                                            })
                                    }
                                }).catch((err) => {
                                    console.log('查找用户时发生错误')
                                    console.log(err)
                                    res.send({
                                        code: 2,
                                        msg: '查找用户时发生错误',
                                        error: err
                                    })
                                })
                        }
                    }).catch((err) => {
                        console.log('查找电话时发生错误')
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '查找电话时发生错误',
                            error: err
                        })
                    })
            }
        })
        .catch((err) => {
            console.log('添加人员时服务器发生错误')
            res.status(500).json({
                msg: '添加人员时服务器发生错误'
            })
            console.log(err)
        })
}

exports.dirvers_edit = (req, res, next) => {
    Product.find({ _id: req.body._id })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到此司机信息'
                })
            } else {
                Product.find({ "dirverid": req.body.dirverid })
                    .then((doc2) => {
                        let data = doc2.filter((item) => {
                            return item._id != req.body._id
                        })
                        if (data.length != 0) {
                            res.send({
                                code: 1,
                                msg: '该准证号码已存在!'
                            })
                        } else {
                            Product.find({ "dirverphone": req.body.dirverphone })
                                .then((doc3) => {
                                    let data2 = doc3.filter((item) => {
                                        return item._id != req.body._id
                                    })
                                    if (data2.length != 0) {
                                        res.send({
                                            code: 1,
                                            msg: '该电话号码已存在'
                                        })
                                    } else {
                                        Product.find({ "dirverusername": req.body.dirverusername })
                                            .then((doc4) => {
                                                let data3 = doc4.filter((item) => {
                                                    return item._id != req.body._id
                                                })
                                                if (data3.length != 0) {
                                                    res.send({
                                                        code: 1,
                                                        msg: '该用户名已存在'
                                                    })
                                                } else {
                                                    let updateInfo
                                                    if (req.body.dirverpsw === undefined) {
                                                        updateInfo = {
                                                            dirvername: req.body.dirvername,
                                                            dirverid: req.body.dirverid,
                                                            dirverphone: req.body.dirverphone,
                                                            dirvercard: req.body.dirvercard,
                                                            dirverusername: req.body.dirverusername,
                                                            dirvernote: req.body.dirvernote
                                                        }
                                                    } else {
                                                        let psw = req.body.dirverpsw
                                                        req.body.dirverpsw = bcrypt.hashSync(psw)
                                                        updateInfo = {
                                                            dirvername: req.body.dirvername,
                                                            dirverid: req.body.dirverid,
                                                            dirverphone: req.body.dirverphone,
                                                            dirvercard: req.body.dirvercard,
                                                            dirverusername: req.body.dirverusername,
                                                            dirverpsw: req.body.dirverpsw,
                                                            dirvernote: req.body.dirvernote
                                                        }
                                                    }
                                                    Product.updateMany({ _id: req.body._id }, updateInfo)
                                                        .then(() => {
                                                            res.send({
                                                                code: 0,
                                                                msg: '修改司机信息成功'
                                                            })
                                                        })
                                                        .catch((err) => {
                                                            res.send({
                                                                code: 2,
                                                                msg: '修改司机信息时出现错误',
                                                                error: err
                                                            })
                                                            console.log('修改司机信息时出现错误')
                                                            console.log(err)
                                                        })
                                                }
                                            })
                                            .catch(err => {
                                                res.send({
                                                    code: 2,
                                                    msg: '查找用户名时出错',
                                                    error: err
                                                })
                                                console.log('查找用户名时出错')
                                                console.log(err)
                                            })
                                    }
                                })
                                .catch(err => {
                                    res.send({
                                        code: 2,
                                        msg: '查找电话号码时出错',
                                        error: err
                                    })
                                    console.log('查找准证号码时出错')
                                    console.log(err)
                                })
                        }
                    })
                    .catch((err) => {
                        res.send({
                            code: 2,
                            msg: '查找准证号码时出错',
                            error: err
                        })
                        console.log('查找准证号码时出错')
                        console.log(err)
                    })

            }
        })
        .catch((err) => {
            console.log('修改司机时服务器发生错误')
            res.status(500).json({
                msg: '修改司机时服务器发生错误',
                code: 2,
                error: err
            })
            console.log(err)
        })
}

exports.dirvers_delete = (req, res, next) => {
    Product.find({ _id: req.body._id })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该司机'
                })
            } else {
                Product.remove({ _id: req.body._id })
                    .then((docc) => {
                        res.send({
                            code: 0,
                            msg: '删除成功'
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '删除时出现错误',
                            error: err
                        })
                    })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                code: 2,
                error: err
            })
        })
}

exports.driver_find = (req, res, next) => {
    Product.find({ "dirvername": { $regex: req.body.word, $options: 'i' } })
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该数据'
                })
            } else {
                Product.count({ "dirvername": { $regex: req.body.word, $options: 'i' } })
                    .then(item => {
                        res.send({
                            code: 0,
                            doc: doc,
                            count: item,
                            msg: '查找成功'
                        })
                    })
                    .catch(err => {
                        res.send({
                            msg: '计数时服务器发生错误',
                            error: err
                        })
                    })

            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                error: err
            })
        })
}
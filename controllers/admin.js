const Product = require('../models/admin')
const bcrypt = require('bcryptjs')
const myArea = require('../models/area')
const mycompany = require('../models/clienta')
const myRemainBillNumber = require('../models/remainBillNumber')

exports.admin_changePSW = (req, res, next) => {
    Product.findOne({ 'name': 'admin' })
        .then((doc) => {
            bcrypt.compare(req.body.oldpassword, doc.password)
                .then(bcdoc => {
                    if (bcdoc) {
                        let psw = bcrypt.hashSync(req.body.newpassword)
                        Product.updateOne({ 'name': 'admin' }, {
                            password: psw
                        })
                            .then(() => {
                                res.send({
                                    msg: '更新密码成功',
                                    code: 0
                                })
                            })
                            .catch(err => {
                                res.send({
                                    msg: '更新密码出现错误',
                                    code: 2,
                                    error: err
                                })
                            })
                    } else {
                        res.send({
                            msg: '密码错误，请重试',
                            code: 1
                        })
                    }
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '修改数据时服务器发生错误',
                error: err
            })
        })
}

exports.admin_setInitPart1 = (req, res, next) => {
    myArea.countDocuments({ areaName: '无区域' })//创建默认区域
        .then(doc => {
            if (doc === 0) {
                myArea.create({
                    areaName: '无区域',
                    areaDescription: '无区域',
                    invisible: true
                })
                    .then(() => {
                        res.send({
                            code: 0,
                            msg: '默认区域创建成功'
                        })
                    })
                    .catch(err => {
                        console.log('catch an error while create area')
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
                    })
            } else {
                res.send({
                    code: 1,
                    msg: '默认区域已存在'
                })
            }
        })
        .catch(err => {
            console.log('catch an error while count area')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
exports.admin_setInitPart2 = (req, res, next) => {
    mycompany.countDocuments({ clientaname: '无合作商' })
        .then(doc => {
            if (doc === 0) {
                mycompany.create({
                    clientaname: '无合作商',
                    clientaaddress: '无合作商',
                    clientaphone: '无合作商',
                    clientastatus: 'incative',
                    clientapostcode: '无合作商',
                    clientacontract: 999,
                    clientamail: '无合作商',
                    invisible: true
                })
                    .then(() => {
                        res.send({
                            code: 0,
                            msg: '默认合作商创建成功'
                        })
                    })
                    .catch(err => {
                        console.log('catch an error while create company')
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
                    })
            } else {
                res.send({
                    code: 1,
                    msg: '默认合作商创建已存在'
                })
            }
        })
        .catch(err => {
            console.log('catch an error while count company')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.admin_setInitPart3 = (req, res, next) => {
    myRemainBillNumber.countDocuments({})
        .then(doc => {
            if (doc === 0) {
                myRemainBillNumber.create()
                    .then(doc => {
                        if (doc) {
                            res.send({
                                code: 0
                            })
                        } else {
                            res.send({
                                code: 1,
                                doc: doc
                            })
                        }
                    })
                    .catch(err => {
                        console.log('catch an error while create remain bill number')
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
                    })
            } else {
                res.send({
                    code: 1,
                    msg: '默认剩余订单计数已存在'
                })
            }
        })
        .catch(err => {
            console.log('catch an error while count company')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
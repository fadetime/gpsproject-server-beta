//操作合作商交互方法
const Product = require('../models/clienta')
const ClientB = require('../models/clientb')
const bcrypt = require('bcryptjs')

exports.clientas_get = (req, res, next) => {
    Product.find()
        .then((doc) => {
            console.log(doc)
            res.send(doc)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                err
            })
        })
}

exports.clientas_get_all = (req, res, next) => {
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

exports.clientas_create_product = (req, res, next) => {
    Product.find({ 'clientaname': req.body.clientaname })
        .then((doc) => {
            if (doc.length != 0) {
                res.send({
                    code: 1,
                    msg: '此合作商名称已存在'
                })
            } else {
                Product.find({ 'clientapostcode': req.body.clientapostcode })
                    .then((item) => {
                        if (item.length != 0) {
                            res.send({
                                code: 1,
                                msg: '此合作商邮编已存在'
                            })
                        } else {
                            let psw = req.body.clientapsw
                            req.body.clientapsw = bcrypt.hashSync(psw)
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
                                        err
                                    })
                                })
                        }
                    })
                    .catch((err) => {
                        console.log('查找邮编时出错')
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '查找邮编时出现错误'
                        })
                    })
            }
        })
        .catch((err) => {
            console.log('创建合作商时服务器发生错误')
            console.log(err)
            res.status(500).json({
                msg: '创建合作商时服务器发生错误'
            })
        })
}

exports.clientas_edit = (req, res, next) => {
    Product.find({ _id: req.body._id })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该信息'
                })
            } else {
                Product.find({ clientaname: req.body.clientaname })
                    .then((doc1) => {
                        let data = doc1.filter((item) => {
                            return item._id != req.body._id
                        })
                        if (data.length === 0) {
                            Product.find({ clientausername: req.body.clientausername })
                                .then((doc3) => {
                                    let data2 = doc3.filter((item) => {
                                        return item._id != req.body._id
                                    })
                                    if (data2.length == 0) {
                                        let editInfo
                                        if (req.body.clientapsw) {
                                            let psw = req.body.clientapsw
                                            req.body.clientapsw = bcrypt.hashSync(psw)
                                            editInfo = {
                                                clientaname: req.body.clientaname,
                                                clientaaddress: req.body.clientaaddress,
                                                clientaphone: req.body.clientaphone,
                                                clientastatus: req.body.clientastatus,
                                                clientapostcode: req.body.clientapostcode,
                                                clientausername: req.body.clientausername,
                                                clientapsw: req.body.clientapsw,
                                                clientacontract: req.body.clientacontract,
                                                clientatime: req.body.clientatime,
                                                clientamail: req.body.clientamail
                                            }
                                        } else {
                                            editInfo = {
                                                clientaname: req.body.clientaname,
                                                clientaaddress: req.body.clientaaddress,
                                                clientaphone: req.body.clientaphone,
                                                clientastatus: req.body.clientastatus,
                                                clientapostcode: req.body.clientapostcode,
                                                clientausername: req.body.clientausername,
                                                clientacontract: req.body.clientacontract,
                                                clientatime: req.body.clientatime,
                                                clientamail: req.body.clientamail
                                            }
                                        }

                                        Product.updateMany({ _id: req.body._id }, editInfo)
                                            .then(() => {
                                                res.send({
                                                    code: 0,
                                                    msg: '更新合作商成功'
                                                })
                                            })
                                            .catch((err) => {
                                                console.log('更新合作商时出现错误')
                                                console.log(err)
                                                res.send({
                                                    code: 2,
                                                    msg: '更新合作商时出现错误',
                                                    error: err
                                                })
                                            })
                                    } else {
                                        res.send({
                                            code: 1,
                                            msg: '该合作商用户名已存在'
                                        })
                                    }
                                })
                                .catch((err) => {
                                    console.log('查找合作商用户名时出现错误')
                                    console.log(err)
                                    res.send({
                                        code: 2,
                                        msg: '查找合作商用户名时出现错误',
                                        error: err
                                    })
                                })


                        } else {
                            res.send({
                                code: 1,
                                msg: '该合作商名已存在'
                            })
                        }
                    })
                    .catch((err) => {
                        console.log('查找合作商名称时出现错误')
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '查找合作商名称时出现错误',
                            error: err
                        })
                    })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                err
            })
        })
}

exports.clientas_remove = (req, res, next) => {
    Product.find({ _id: req.body._id })
        .then((doc) => {
            if (doc.length != 0) {
                Product.remove({ _id: req.body._id })
                    .then((item) => {
                        console.log('###########')
                        console.log(item)
                        console.log(req.body._id)
                        ClientB.updateMany({ clientbserve: req.body._id }, {
                            'clientbserve': null
                        })
                            .then(() => {
                                res.send({
                                    code: 0,
                                    msg: '删除成功'
                                })
                            })
                            .catch((err) => {
                                res.send({
                                    code: 2,
                                    msg: '关联删除出现错误',
                                    error: err
                                })
                            })
                    })
                    .catch((err) => {
                        console.log('删除时出现错误')
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '删除时出现错误',
                            error: err
                        })
                    })
            } else {
                res.send({
                    code: 1,
                    msg: '未找到该合作商'
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

exports.clientA_find = (req, res, next) => {
    Product.find({ "clientaname": { $regex: req.body.word, $options: 'i' } })
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该数据'
                })
            } else {
                Product.count({ "clientaname": { $regex: req.body.word, $options: 'i' } })
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
                            msg: '获取数据时服务器发生错误',
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
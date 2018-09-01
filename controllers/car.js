const Product = require('../models/car')

exports.carts_get_all = (req, res, next) => {
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

exports.carts_post_all = (req, res, next) => {
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

exports.carts_update = (req, res, next) => {
    Product.findOne({ '_id': req.body._id })
        .then((doc) => {
            if (doc.length == 0) {
                console.log('未找到该车辆信息')
                res.send({
                    code: 1,
                    msg: '未找到该车辆信息'
                })
            } else {
                if (doc.carid == req.body.carid) {
                    Product.updateMany({ _id: req.body._id }, {
                        cartype: req.body.cartype,
                        tailgate: req.body.tailgate,
                        cardate: req.body.cardate,
                        cartimes: req.body.cartimes,
                        carnote: req.body.carnote
                    })
                        .then((item) => {
                            res.send({
                                code: 0,
                                msg: '更新车辆信息成功'
                            })
                        })
                        .catch((err) => {
                            res.send({
                                code: 2,
                                msg: '更新时出现问题',
                                error: err
                            })
                            console.log(err)
                        })
                } else {
                    Product.find({ 'carid': req.body.carid })
                        .then((item) => {
                            if (item.length != 0) {
                                res.send({
                                    code: 1,
                                    msg: '车牌号码已存在'
                                })
                            } else {
                                Product.updateMany({ _id: req.body._id }, {
                                    carid: req.body.carid,
                                    cartype: req.body.cartype,
                                    tailgate: req.body.tailgate,
                                    cardate: req.body.cardate,
                                    cartimes: req.body.cartimes,
                                    carnote: req.body.carnote
                                })
                                    .then((item) => {
                                        res.send({
                                            code: 0,
                                            msg: '更新车辆信息成功'
                                        })
                                    })
                                    .catch((err) => {
                                        res.send({
                                            code: 2,
                                            msg: '更新时出现问题',
                                            error: err
                                        })
                                        console.log(err)
                                    })
                            }
                        })
                        .catch((err) => {
                            console.log('查找车牌时出现错误')
                            console.log(err)
                            res.send({
                                code: 2,
                                msg: '查找车牌时出现错误'
                            })
                        })
                }
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

exports.carts_update_img = (req, res, next) => {
    Product.findOne({ '_id': req.body._id })
    .then(doc => {
        if (doc.length = 0) {
            res.send({
                code: 1,
                msg: '更改照片时未找到该车辆'
            })
        } else{
            Product.updateOne({'_id':req.body._id},{
                image:req.file.path
            })
            .then(() => {
                res.send({
                    code: 0,
                    msg: '更新照片信息成功'
                })
            })
            .catch(error => {
                res.send({
                    code: 2,
                    msg: '更新照片时出现问题',
                    error: error
                })
                console.log(error)
            })
        }
    })
    .catch((err) => {
        console.log(err)
        console.log('查找车辆时服务器发生错误')
        res.status(500).json({
            msg: '查找车辆时服务器发生错误'
        })
    })
}

exports.carts_create_product = (req, res, next) => {
    Product.find({ 'carid': req.body.carid })
        .then((doc) => {
            if (doc.length != 0) {
                res.send({
                    code: 1,
                    msg: '此号码车辆已存在'
                })
            } else if (doc.length === 0) {
                Product.create({
                    carid:req.body.carid,
                    cartype:req.body.cartype,
                    tailgate:req.body.tailgate,
                    coolstore:req.body.coolstore,
                    carnote:req.body.carnote,
                    image:req.file.path
                })
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
            } else {
                console.log('创建车辆时服务器发生错误')
                res.status(500).json({
                    msg: '创建车辆时服务器发生错误'
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.carts_remove = (req, res, next) => {
    Product.find({ '_id': req.body._id })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到此车辆信息'
                })
            } else {
                Product.remove({ _id: req.body._id })
                    .then((doc) => {
                        console.log(doc)
                        res.status(200).json({
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
            console.log('删除车辆时服务器发生错误')
            res.status(500).json({
                msg: '删除车辆时服务器发生错误'
            })
        })
}

exports.carts_find = (req, res, next) => {
    Product.find({ 'carid': { $regex: req.body.word, $options: 'i' } })
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该数据'
                })
            } else {
                Product.count({ "carid": { $regex: req.body.word, $options: 'i' } })
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
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                error: err
            })
        })
}
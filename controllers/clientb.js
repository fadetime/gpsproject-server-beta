//操作客户交互方法
const Product = require('../models/clientb')

exports.clientbs_get = (req, res, next) => {
    Product.find()
        .populate('clientbserve')
        .populate('clientbarea')
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

exports.clientbs_get_all = (req, res, next) => {
    Product.find()
        .populate('clientbserve')
        .populate('clientbarea')
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
                        msg: '计数时出现错误',
                        code: 2,
                        error: err
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                err
            })
        })


}

exports.clientbs_create_product = (req, res, next) => {
    Product.find({ 'clientbname': req.body.clientbname })
        .then((doc) => {
            if (doc.length != 0) {
                res.send({
                    code: 1,
                    msg: '此客户名称已存在'
                })
            } else {
                if (req.file) {
                    Product.create({
                        clientbname: req.body.clientbname,
                        clientbaddress: req.body.clientbaddress,
                        clientbphone: req.body.clientbphone,
                        clientbstatus: req.body.clientbstatus,
                        clientbpostcode: req.body.clientbpostcode,
                        clientbserve: req.body.clientbserve,
                        clientbarea: req.body.clientbarea,
                        image: req.file.path
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
                                err
                            })
                        })
                } else {
                    Product.create({
                        clientbname: req.body.clientbname,
                        clientbaddress: req.body.clientbaddress,
                        clientbphone: req.body.clientbphone,
                        clientbstatus: req.body.clientbstatus,
                        clientbpostcode: req.body.clientbpostcode,
                        clientbserve: req.body.clientbserve,
                        clientbarea: req.body.clientbarea,
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
                                err
                            })
                        })
                }
            }
        })
        .catch((err) => {
            console.log('创建客户时服务器发生错误')
            console.log(err)
            res.status(500).json({
                msg: '创建客户时服务器发生错误'
            })
        })
}

exports.clientbs_update_line = (req, res, next) => {
    if (!req.body.choiceclientb || !req.body.timesname) {
        console.log('缺少修改客户线路的必要信息')
        res.send({
            code: 3,
            msg: '缺少修改客户线路的必要信息'
        })
    } else {
        let choiceclientb = req.body.choiceclientb
        let timesname = req.body.timesname
        choiceclientb.forEach((item) => {
            Product.find({ '_id': item })
                .then((doc) => {
                    if (doc.length == 0) {
                        res.send({
                            code: 1,
                            msg: '未找到该客户'
                        })
                    } else {
                        Product.updateMany({ _id: item }, {
                            clientbline: timesname
                        }).then((doc) => {
                            console.log(doc)
                            res.status(200).json({
                                code: 0,
                                msg: '修改成功'
                            })
                        }).catch((err) => {
                            console.log('修改客户线路时出现错误' + err)
                            res.send({
                                code: 2,
                                msg: '修改客户线路时出现错误',
                                err
                            })
                        })
                    }
                }).catch((err) => {
                    console.log('查找客户线路时出现错误' + err)
                })
        });
    }
}

exports.clientbs_edit_img = (req, res, next) => {
    Product.findOne({ '_id': req.body._id })
        .then(doc => {
            if (doc.length = 0) {
                res.send({
                    code: 1,
                    msg: '更改照片时未找到该客户'
                })
            } else {
                Product.updateOne({ '_id': req.body._id }, {
                    image: req.file.path
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
            console.log('查找客户时服务器发生错误')
            res.send({
                msg: '查找客户时服务器发生错误',
                code: 2,
                error: err
            })
        })
}

exports.clientbs_edit = (req, res, next) => {
    Product.find({ _id: req.body._id })
        .then((doc) => {
            if (doc.length === 0) {
                res.send({
                    code: 1,
                    msg: '未找到该客户'
                })
            } else {
                Product.find({ clientbname: req.body.clientbname })
                    .then((doc1) => {
                        let data = doc1.filter((item) => {
                            return item._id != req.body._id
                        })
                        if (data.length === 0) {
                            Product.updateOne({ _id: req.body._id }, {
                                clientbname: req.body.clientbname,
                                clientbaddress: req.body.clientbaddress,
                                clientbphone: req.body.clientbphone,
                                clientbstatus: req.body.clientbstatus,
                                clientbpostcode: req.body.clientbpostcode,
                                clientbserve: req.body.clientbserve,
                                clientbarea: req.body.clientbarea
                            })
                                .then(() => {
                                    res.send({
                                        code: 0,
                                        msg: '修改成功'
                                    })
                                })
                                .catch((err) => {
                                    console.log('查找客户邮编出错')
                                    console.log(err)
                                    res.send({
                                        code: 2,
                                        msg: '查找客户邮编出错',
                                        error: err
                                    })
                                })
                        } else {
                            res.send({
                                code: 1,
                                msg: '客户名称重复'
                            })
                        }
                    })
                    .catch((err) => {
                        console.log('查找客户名称出错')
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '查找客户名称出错',
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

exports.clientbs_remove = (req, res, next) => {
    Product.find({ _id: req.body._id })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该数据'
                })
            } else {
                Product.remove({ _id: req.body._id })
                    .then(() => {
                        res.send({
                            code: 0,
                            msg: '删除成功'
                        })
                    })
                    .catch((err) => {
                        res.send({
                            code: 2,
                            msg: '删除时出现错误'
                        })
                        console.log('删除时出现错误')
                        console.log(err)
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

exports.clientbs_find = (req, res, next) => {
    Product.find({ "clientbname": { $regex: req.body.word, $options: 'i' } })
        .populate('clientbserve')
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该数据'
                })
            } else {
                Product.count({ "clientbname": { $regex: req.body.word, $options: 'i' } })
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

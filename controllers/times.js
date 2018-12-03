const Product = require('../models/times')
const logControllers = require('../models/log')
const myClient = require('../models/clientb')

exports.times_get_one = (req, res, next) => {
    Product.findById(req.body.line_id)
        .populate('timescar')
        .populate('timesdirver')
        .populate({ path: 'timesclientb', populate: { path: 'clientbserve' } })
        .populate({ path: 'timesclientb', populate: { path: 'clientbarea' } })
        .then(doc => {
            if (doc) {
                res.send({
                    code: 0,
                    doc: doc
                })
            } else {
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find a line info')
            console.log(err)
            res.send({
                code: 2,
                err: error
            })
        })
}

exports.times_get_all = (req, res, next) => {
    Product.find()
        .sort({ lineIndexNumber: 1 })
        .populate('timescar')
        .populate('timesdirver')
        .populate({ path: 'timesclientb', populate: { path: 'clientbserve' } })
        .populate({ path: 'timesclientb', populate: { path: 'clientbarea' } })
        .then((doc) => {
            console.log(doc)
            res.send({
                doc,
                code: 0,
                msg: '数据获取成功'
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

exports.times_post_all = (req, res, next) => {
    Product.find()
        .sort({ lineIndexNumber: 1 })
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .populate('timescar')
        .populate('timesdirver')
        .populate({ path: 'timesclientb', populate: { path: 'clientbserve' } })
        .populate({ path: 'timesclientb', populate: { path: 'clientbarea' } })
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
                err
            })
        })
}

exports.times_create_product = (req, res, next) => {
    Product.findOne({ 'timesname': req.body.timesname })
        .then((doc) => {
            if (doc) {
                res.send({
                    code: 1,
                    msg: '此车次名已存在'
                })
            } else {
                Product.create(req.body)
                    .then(() => {

                        let logOperator
                        if (req.body.logOperator) {
                            logOperator = req.body.logOperator
                        } else {
                            logOperator = 'name error'
                        }
                        logControllers.create({
                            logDate: new Date().toISOString(),
                            logOperator: logOperator,
                            logPlace: 'line',
                            logMode: 'create',
                            logInfo: '信息(' + '名称' + req.body.timesclientb + ')'
                        })
                            .then(() => {
                                res.send({
                                    code: 0,
                                    msg: '添加车次成功'
                                })
                            })
                            .catch(err => {
                                console.log('catch an error while write log')
                                res.send({
                                    code: 2,
                                    msg: '添加车次时出现问题',
                                    error: err
                                })
                                console.log(err)
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
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.times_eidt = (req, res, next) => {
    Product.findById(req.body._id)
        .then((doc) => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该线路'
                })
            } else {
                Product.updateOne({ _id: req.body._id }, {
                    timesname: req.body.timesname,
                    timescar: req.body.timescar,
                    timesdirver: req.body.timesdirver,
                    timesclientb: req.body.timesclientb,
                    timesclientnumber: req.body.timesclientnumber,
                    timesnote: req.body.timesnote,
                    NcNumber: req.body.NcNumber
                })
                    .then(() => {
                        let logOperator
                        if (req.body.logOperator) {
                            logOperator = req.body.logOperator
                        } else {
                            logOperator = 'name error'
                        }
                        logControllers.create({
                            logDate: new Date().toISOString(),
                            logOperator: logOperator,
                            logPlace: 'line',
                            logMode: 'edit',
                            logInfo: '信息：(' + '名称' + req.body.timesname + '；准证' + req.body.timesnote + ';)'
                        })
                            .then(() => {
                                res.send({
                                    code: 0,
                                    msg: '修改线路成功'
                                })
                            })
                            .catch(err => {
                                console.log('catch an error while write log')
                                res.send({
                                    code: 2,
                                    msg: '修改线路时出现问题',
                                    error: err
                                })
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log('更新时出现问题')
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '更新时出现问题'
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

exports.times_remove = (req, res, next) => {
    Product.findById(req.body._id)
        .then((doc) => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该线路'
                })
            } else {
                Product.deleteOne({ _id: req.body._id })
                    .then(() => {
                        let logOperator
                        if (req.body.logOperator) {
                            logOperator = req.body.logOperator
                        } else {
                            logOperator = 'name error'
                        }
                        logControllers.create({
                            logDate: new Date().toISOString(),
                            logOperator: logOperator,
                            logPlace: 'line',
                            logMode: 'remove',
                            logInfo: '信息(' + doc + ')'
                        })
                            .then(() => {
                                res.send({
                                    code: 0,
                                    msg: '删除车次成功'
                                })
                            })
                            .catch(err => {
                                console.log('catch an error while write log')
                                res.send({
                                    code: 2,
                                    msg: '删除车次时出现问题',
                                    error: err
                                })
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log('删除时发生错误')
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '删除时发生错误',
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

exports.times_find = (req, res, next) => {
    Product.find({ 'timesname': { $regex: req.body.word, $options: 'i' } })
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .populate('timescar')
        .populate('timesdirver')
        .populate({ path: 'timesclientb', populate: { path: 'clientbserve' } })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该数据'
                })
            } else {
                Product.count({ 'timesname': { $regex: req.body.word, $options: 'i' } })
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

exports.times_sort = (req, res, next) => {

    Product.find()
        .then((doc) => {
            let tempIndex = 0
            let success = 0
            if (req.body.array) {
                req.body.array.forEach(elementx => {
                    doc.forEach(elementy => {
                        if (elementx == elementy._id) {
                            Product.updateOne({ _id: elementx }, {
                                lineIndexNumber: tempIndex
                            })
                                .then(
                                    success += 1
                                )
                                .catch(err => {
                                    console.log(err)
                                })
                            tempIndex += 1
                        }
                    });
                });
            }
            if (req.body.array.length == success) {
                res.send({
                    code: 0,
                    msg: '数据修改成功',
                    successNum: success
                })
            } else {
                res.send({
                    code: 1,
                    msg: '数据就该失败，请联系管理员',
                    successNum: success
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

exports.usedDriver_add = (req, res, next) => {
    if (req.body.usedDriver) {
        Product.findById(req.body._id)
            .then(doc => {
                let tempArray = []
                if (doc.usedDriver.length != 0) {
                    tempArray = doc.usedDriver
                    let flag = false
                    tempArray.forEach(element => {
                        if (element === req.body.usedDriver) {
                            flag = true
                        }
                    })
                    if (flag) {
                        res.send({
                            code: 0
                        })
                    } else {
                        tempArray.push(req.body.usedDriver)
                        Product.updateOne({ _id: req.body._id }, {
                            usedDriver: tempArray
                        })
                            .then(() => {
                                res.send({
                                    code: 0
                                })
                            })
                            .catch(err => {
                                console.log('catch an error while update used driver')
                                console.log(err)
                                res.send({
                                    code: 2,
                                    error: err
                                })
                            })
                    }
                } else {
                    tempArray.push(req.body.usedDriver)
                    Product.updateOne({ _id: req.body._id }, {
                        usedDriver: tempArray
                    })
                        .then(() => {
                            res.send({
                                code: 0
                            })
                        })
                        .catch(err => {
                            console.log('catch an error while update used driver')
                            console.log(err)
                            res.send({
                                code: 2,
                                error: err
                            })
                        })
                }

            })
            .catch(err => {
                console.log('catch an error while find used driver')
                console.log(err)
                res.send({
                    code: 2,
                    error: err
                })
            })

    } else {
        res.send({
            code: 1,
            msg: '非法操作'
        })
    }
}

exports.usedDriver_remove = (req, res, next) => {
    Product.findById(req.body._id)
        .then(doc => {
            console.log(req.body)
            doc.usedDriver.remove(req.body.usedDriver)
            Product.updateOne({ _id: req.body._id }, {
                usedDriver: doc.usedDriver
            })
                .then(() => {
                    res.send({
                        code: 0
                    })
                })
                .catch(err => {
                    console.log('catch an error while remove used driver')
                    console.log(err)
                    res.send({
                        code: 2,
                        error: err
                    })
                })
        })
        .catch(err => {
            console.log('catch an error while find used driver')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.usedDriver_editClientSort = (req, res, next) => {
    //客户排序 start
    let index = 0
    let sortSuccess = 0
    req.body.clientId.forEach(element => {
        index += 1
        console.log(element)
        myClient.updateOne({ _id: element }, {
            NcSortNum: index
        })
            .then(() => {
                sortSuccess += 1
                console.log('成功排序客户数量:' + sortSuccess)
            })
            .catch(err => {
                console.log('catch an error while sort client')
                console.log(err)
            })
    })
    res.send({
        code:0
    })
    //客户排序 end
}

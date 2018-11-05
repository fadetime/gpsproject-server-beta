//操作客户交互方法
const Product = require('../models/clientb')
const _ = require('lodash')
const fs = require('fs')
const logControllers = require('../models/log')

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

exports.clientbs_get_active = (req, res, next) => {
    Product.find({ 'clientbstatus': 'active' })
        .populate('clientbserve')
        .populate('clientbarea')
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .then(doc => {
            if (doc.length === 0) {
                res.send({
                    code: 1,
                    smg: '未找到该数据'
                })
            } else {
                Product.count({ 'clientbstatus': 'active' })
                    .then(countNum => {
                        res.send({
                            code: 0,
                            doc: doc,
                            countNum: countNum
                        })
                    })
                    .catch(err => {
                        console.log('catch a err while count document')
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
                    })

            }

        })
        .catch(err => {
            console.log('an error be catch while looking up the user')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.clientbs_active_Apage = (req, res, next) => {
    Product.find({ 'clientbname': { $regex: req.body.keyWord, $options: 'i' } })
        .populate('clientbserve')
        .populate('clientbarea')
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .then(doc => {
            if (doc.length === 0) {
                res.send({
                    code: 1,
                    msg: 'the doc length is zero'
                })
            } else {
                Product.count({ 'clientbname': { $regex: req.body.keyWord, $options: 'i' } })
                    .then(countNum => {
                        res.send({
                            code: 0,
                            doc: doc,
                            countNum: countNum
                        })
                    })
                    .catch(err => {
                        console.log('an error be catch while count the data')
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            console.log('an error be catch while looking up the user')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.clientbs_active_filter_Apage = (req, res, next) => {
    Product.find({ 'clientbstatus': 'active' })
        .populate('clientbserve')
        .populate('clientbarea')
        .then(doc => {
            if (doc.length === 0) {
                res.send({
                    code: 1,
                    msg: '未找到有效数据'
                })
            } else {
                Product.count({ 'clientbstatus': 'active' })
                    .then(countNum => {
                        let newArray = []
                        if (req.body.clientArea) {
                            newArray = doc.filter(filterItem => {
                                return filterItem.clientbarea._id == req.body.clientArea
                            })//获取需要过滤的数据
                        } else {
                            newArray = doc.filter(filterItem => {
                                return filterItem.clientbserve._id == req.body.clientServe
                            })//获取需要过滤的数据
                        }
                        let longArray = _.concat(newArray, doc);//重新结合
                        let payloadArray = _.uniq(longArray);//去重
                        let startData = (req.body.pageNow - 1) * req.body.pageSize
                        let endData = req.body.pageNow * req.body.pageSize
                        let sliceArray = payloadArray.slice(startData, endData)
                        res.send({
                            code: 0,
                            doc: sliceArray,
                            countNum: countNum
                        })
                    })
                    .catch(err => {
                        console.log('an error be catch while count the data')
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            console.log('an error be catch while filter find the data')
            console.log(err)
            res.send({
                code: 2,
                error: err
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
                let tempData
                if (req.file) {
                    tempData = {
                        clientbname: req.body.clientbname,
                        clientbaddress: req.body.clientbaddress,
                        clientbphone: req.body.clientbphone,
                        clientbstatus: req.body.clientbstatus,
                        clientbpostcode: req.body.clientbpostcode,
                        clientbserve: req.body.clientbserve,
                        clientbarea: req.body.clientbarea,
                        isNeedPic:req.body.isNeedPic,
                        timeLimit:req.body.timeLimit,
                        image: req.file.path
                    }
                } else {
                    tempData = {
                        clientbname: req.body.clientbname,
                        clientbaddress: req.body.clientbaddress,
                        clientbphone: req.body.clientbphone,
                        clientbstatus: req.body.clientbstatus,
                        clientbpostcode: req.body.clientbpostcode,
                        clientbserve: req.body.clientbserve,
                        isNeedPic:req.body.isNeedPic,
                        timeLimit:req.body.timeLimit,
                        clientbarea: req.body.clientbarea
                    }
                }
                Product.create(tempData)
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
                            logPlace: 'client_B',
                            logMode: 'create',
                            logInfo: '信息：(' + '姓名' + req.body.clientbname + '；准证' + req.body.clientbaddress + '；电话' + req.body.clientbphone + '；驾照' + req.body.clientbpostcode + ';)'
                        })
                            .then(() => {
                                res.send({
                                    code: 0,
                                    msg: '添加客户成功'
                                })
                            })
                            .catch(err => {
                                console.log('catch an error while write log')
                                res.send({
                                    code: 2,
                                    msg: '添加客户时出现问题',
                                    error: err
                                })
                                console.log(err)
                            })
                    })
                    .catch(err => {
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
                if (doc.image) {
                    let fileName = doc.image.slice(8)
                    fs.unlink('./uploads/' + fileName, err => {
                        if (err) {
                            return console.log(err)
                        } else {
                            console.log('image del done')
                        }
                    })
                }
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
                                clientbarea: req.body.clientbarea,
                                timeLimit:req.body.timeLimit,
                                isNeedPic:req.body.isNeedPic
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
                                        logPlace: 'client_B',
                                        logMode: 'edit',
                                        logInfo: '原始信息(' + doc + ');' +
                                            '更改信息：(' + '餐厅:' + doc.clientbname + ';地址:' + doc.clientbaddress + ';电话:' + doc.clientbphone + ';邮编:' + doc.clientbpostcode + ';)'
                                    })
                                        .then(() => {
                                            res.send({
                                                code: 0,
                                                msg: '修改客户成功'
                                            })
                                        })
                                        .catch(err => {
                                            console.log('catch an error while write log')
                                            res.send({
                                                code: 2,
                                                msg: '修改客户时出现问题',
                                                error: err
                                            })
                                            console.log(err)
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
    Product.findOne({ _id: req.body._id })
        .then((doc) => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该数据'
                })
            } else {
                if (doc.image) {
                    let fileName = doc.image.slice(8)
                    fs.unlink('./uploads/' + fileName, err => {
                        if (err) {
                            return console.log(err)
                        } else {
                            console.log('image del done')
                        }
                    })
                }
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
                            logPlace: 'client_B',
                            logMode: 'delete',
                            logInfo: '信息：(' + '餐厅:' + doc.clientbname + ';地址:' + doc.clientbaddress + ';电话:' + doc.clientbphone + ';邮编:' + doc.clientbpostcode + ';)'
                        })
                            .then(() => {
                                res.send({
                                    code: 0,
                                    msg: '删除客户成功'
                                })
                            })
                            .catch(err => {
                                console.log('catch an error while write log')
                                res.send({
                                    code: 2,
                                    msg: '删除客户时出现问题',
                                    error: err
                                })
                                console.log(err)
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
        .populate('clientbarea')
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

exports.client_change_needpic = (req, res, next) => {
    Product.findByIdAndUpdate(req.body._id,{
        isNeedPic:req.body.isNeedPic
    })
    .then(doc => {
        console.log('#######')
        console.log(doc)
        console.log('#######')
        res.send({
            code:0
        })
    })
    .catch(err => {
        console.log('catch an error while update needpic')
        console.log(err)
        res.send({
            error:err,
            smg:'更新状态时发生错误',
            code:2
        })
    })
}

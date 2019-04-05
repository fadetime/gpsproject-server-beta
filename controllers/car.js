const Product = require('../models/car')
const fs = require('fs')
const logControllers = require('../models/log')

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

exports.client_get_carInfo = (req, res, next) => {
    Product.find({},{carid:-1,_id:-1})
        .then(doc => {
            if(doc.length === 0){
                res.send({
                    code:1
                })
            }else{
                res.send({
                    code:0,
                    doc:doc
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

exports.carts_get_allPlate = (req, res, next) => {
    Product.find({}, { carid: 1 })
        .then((doc) => {
            if (doc.length != 0) {
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
            Product.countDocuments()
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
                    Product.updateOne({ _id: req.body._id }, {
                        cartype: req.body.cartype,
                        tailgate: req.body.tailgate,
                        coolstore: req.body.coolstore,
                        cardate: req.body.cardate,
                        cartimes: req.body.cartimes,
                        carnote: req.body.carnote
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
                                logPlace: 'car',
                                logMode: 'update',
                                logInfo: '原始信息为：' + doc + ';' + '更新后信息：(' + '车牌' + req.body.carid + '类型：' + req.body.cartype + ';' + '尾门：' + req.body.tailgate + '冷藏：' + req.body.coolstore + ';' + '备注：' + req.body.carnote + ';)'
                            })
                                .then(() => {
                                    res.send({
                                        code: 0,
                                        msg: '更新车辆信息成功'
                                    })
                                })
                                .catch(err => {
                                    console.log('catch an error while write log')
                                    res.send({
                                        code: 2,
                                        msg: '写入日志时出现问题',
                                        error: err
                                    })
                                    console.log(err)
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
                                Product.updateOne({ _id: req.body._id }, {
                                    carid: req.body.carid,
                                    cartype: req.body.cartype,
                                    tailgate: req.body.tailgate,
                                    cardate: req.body.cardate,
                                    cartimes: req.body.cartimes,
                                    carnote: req.body.carnote
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
                                            logPlace: 'car',
                                            logMode: 'update',
                                            logInfo: '原始信息为：' + doc + ';' + '更新后信息：(' + '车牌' + req.body.carid + '类型：' + req.body.cartype + ';' + '尾门：' + req.body.tailgate + '冷藏：' + req.body.coolstore + ';' + '备注：' + req.body.carnote + ';)'
                                        })
                                            .then(() => {
                                                res.send({
                                                    code: 0,
                                                    msg: '更新车辆信息成功'
                                                })
                                            })
                                            .catch(err => {
                                                console.log('catch an error while write log')
                                                res.send({
                                                    code: 2,
                                                    msg: '写入日志时出现问题',
                                                    error: err
                                                })
                                                console.log(err)
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
                        let logOperator
                        if (req.body.logOperator) {
                            logOperator = req.body.logOperator
                        } else {
                            logOperator = 'name error'
                        }
                        logControllers.create({
                            logDate: new Date().toISOString(),
                            logOperator: logOperator,
                            logPlace: 'car',
                            logMode: 'image',
                            logInfo: '信息：(' + '新照' + req.file.path + ';)'
                        })
                            .then(() => {
                                res.send({
                                    code: 0,
                                    msg: '更新照片成功'
                                })
                            })
                            .catch(err => {
                                console.log('catch an error while write log')
                                res.send({
                                    code: 2,
                                    msg: '更新照片时出现问题',
                                    error: err
                                })
                                console.log(err)
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
                if (req.file) {
                    Product.create({
                        carid: req.body.carid,
                        cartype: req.body.cartype,
                        tailgate: req.body.tailgate,
                        coolstore: req.body.coolstore,
                        carnote: req.body.carnote,
                        image: req.file.path
                    })
                        .then((doc) => {
                            let logOperator
                            if (req.body.logOperator) {
                                logOperator = req.body.logOperator
                            } else {
                                logOperator = 'name error'
                            }
                            logControllers.create({
                                logDate: new Date().toISOString(),
                                logOperator: logOperator,
                                logPlace: 'car',
                                logMode: 'create',
                                logInfo: '信息：(' + '车牌' + req.body.carid + '类型：' + req.body.cartype + ';' + '尾门：' + req.body.tailgate + '冷藏：' + req.body.coolstore + ';' + '备注：' + req.body.carnote + ';)'
                            })
                                .then(() => {
                                    res.send({
                                        code: 0,
                                        msg: '添加车辆成功'
                                    })
                                })
                                .catch(err => {
                                    console.log('catch an error while write log')
                                    res.send({
                                        code: 2,
                                        msg: '添加车辆时出现问题',
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
                } else {
                    Product.create({
                        carid: req.body.carid,
                        cartype: req.body.cartype,
                        tailgate: req.body.tailgate,
                        coolstore: req.body.coolstore,
                        carnote: req.body.carnote,
                    })
                        .then((doc) => {
                            let logOperator
                            if (req.body.logOperator) {
                                logOperator = req.body.logOperator
                            } else {
                                logOperator = 'name error'
                            }
                            logControllers.create({
                                logDate: new Date().toISOString(),
                                logOperator: logOperator,
                                logPlace: 'car',
                                logMode: 'create',
                                logInfo: '信息：(' + '车牌' + req.body.carid + '类型：' + req.body.cartype + ';' + '尾门：' + req.body.tailgate + '冷藏：' + req.body.coolstore + ';' + '备注：' + req.body.carnote + ';)'
                            })
                                .then(() => {
                                    res.send({
                                        code: 0,
                                        msg: '添加车辆成功'
                                    })
                                })
                                .catch(err => {
                                    console.log('catch an error while write log')
                                    res.send({
                                        code: 2,
                                        msg: '添加车辆时出现问题',
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
    Product.findOne({ '_id': req.body._id })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到此车辆信息'
                })
            } else {
                //如果有图片
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
                            logPlace: 'car',
                            logMode: 'delete',
                            logInfo: '信息：(' + doc + ';)'
                        })
                            .then(() => {
                                res.send({
                                    code: 0,
                                    msg: '删除车辆成功'
                                })
                            })
                            .catch(err => {
                                console.log('catch an error while write log')
                                res.send({
                                    code: 2,
                                    msg: '删除车辆时出现问题',
                                    error: err
                                })
                                console.log(err)
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
                Product.countDocuments({ "carid": { $regex: req.body.word, $options: 'i' } })
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

//-------------------机油监控部分---------------------

exports.manFindAllCar = (req, res, next) => {
    //维修员查看车辆信息
    Product.find({}, { carid: -1, image: -1, kelometer: -1, lastOilKelometer: -1 })
        .then(doc => {
            if(doc.length != 0){
                res.send({
                    code: 0,
                    doc: doc
                })
            }else{
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.manFindChangeOil = (req, res, next) => {
    //维修员修改机油信息
    Product.updateOne({ _id: req.body._id }, {
        lastOilKelometer: req.body.lastOilKelometer
    })
        .then(doc => {
            console.log(doc)
            if(doc.ok === 1){
                res.send({
                    code: 0
                })
            }else{
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.admFindChangeOil = (req, res, next) => {
    let item = null
    if(req.body.changeKmMode === 'km'){
        item = {
            kelometer:req.body.changeNumber
        }
    }else{
        item = {
            lastOilKelometer:req.body.changeNumber
        }
    }
    Product.updateOne({ _id: req.body.car_id }, item)
        .then(doc =>{
            if(doc.ok === 1){
                res.send({
                    code:0
                })
            }else{
                res.send({
                    code: 1
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
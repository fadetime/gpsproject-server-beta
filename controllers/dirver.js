const Product = require('../models/dirver')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const logControllers = require('../models/log')
const carModels = require('../models/car')
const settingModel = require('../models/setting')

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

exports.dirvers_create_product = (req, res, next) => {
    Product.find({ 'dirverid': req.body.dirverid })
        .then((doc) => {
            if (doc.length != 0) {
                res.send({
                    code: 1,
                    msg: '此准证号码已存在'
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
                            if (req.file) {
                                req.body.image = req.file.path
                            }
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
                                        logPlace: 'driver',
                                        logMode: 'create',
                                        logInfo: '信息：(' + '姓名' + req.body.dirvername + '；准证' + req.body.dirverid + '；电话' + req.body.dirverphone + '；驾照' + req.body.dirvercard + '；用户名' + req.body.dirverusername + '；备注' + req.body.dirvernote + ';)'
                                    })
                                        .then(() => {
                                            res.send({
                                                code: 0,
                                                msg: '添加司机成功'
                                            })
                                        })
                                        .catch(err => {
                                            console.log('catch an error while write log')
                                            res.send({
                                                code: 2,
                                                msg: '添加司机时出现问题',
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
    Product.findOne({ _id: req.body._id })
        .then((doc) => {
            if (!doc) {
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
                                        let updateInfo = {}
                                        if (req.body.dirverpsw === undefined) {
                                            updateInfo = {
                                                dirvername: req.body.dirvername,
                                                name_en: req.body.name_en,
                                                dirverid: req.body.dirverid,
                                                dirverphone: req.body.dirverphone,
                                                dirvercard: req.body.dirvercard,
                                                dirverusername: req.body.dirverusername,
                                                dirvernote: req.body.dirvernote,
                                                role:req.body.role
                                            }
                                        } else {
                                            let psw = req.body.dirverpsw
                                            req.body.dirverpsw = bcrypt.hashSync(psw)
                                            updateInfo = {
                                                dirvername: req.body.dirvername,
                                                name_en: req.body.name_en,
                                                dirverid: req.body.dirverid,
                                                dirverphone: req.body.dirverphone,
                                                dirvercard: req.body.dirvercard,
                                                dirverusername: req.body.dirverusername,
                                                dirverpsw: req.body.dirverpsw,
                                                dirvernote: req.body.dirvernote,
                                                role:req.body.role
                                            }
                                        }
                                        Product.updateOne({ _id: req.body._id }, updateInfo)
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
                                                    logPlace: 'driver',
                                                    logMode: 'update',
                                                    logInfo: '原始信息(' + doc + ')'
                                                        + '更新信息：(' + '姓名' + updateInfo.dirvername + '；准证' + updateInfo.dirverid + '；电话' + updateInfo.dirverphone + '；驾照' + updateInfo.dirvercard + '；用户名' + updateInfo.dirverusername + '；备注' + updateInfo.dirvernote + ';)'
                                                })
                                                    .then(() => {
                                                        res.send({
                                                            code: 0,
                                                            msg: '添加司机成功'
                                                        })
                                                    })
                                                    .catch(err => {
                                                        console.log('catch an error while write log')
                                                        res.send({
                                                            code: 2,
                                                            msg: '添加司机时出现问题',
                                                            error: err
                                                        })
                                                        console.log(err)
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

exports.dirver_img_edit = (req, res, next) => {
    console.log(req.body._id)
    Product.findOne({ _id: req.body._id })
        .then((doc) => {
            if (doc.length === 0) {
                res.send({
                    code: 1,
                    msg: '修改照片时未找到该司机'
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
                Product.updateOne({ _id: req.body._id }, {
                    image: req.file.path
                })
                    .then(() => {
                        res.send({
                            code: 0,
                            msg: '修改司机照片信息成功'
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
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '修改照片时获取数据时服务器发生错误',
                code: 2,
                error: err
            })
        })
}

exports.dirvers_delete = (req, res, next) => {
    Product.findOne({ _id: req.body._id })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该司机'
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
                            logPlace: 'driver',
                            logMode: 'delete',
                            logInfo: '信息：(' + '姓名:' + doc.dirvername + ';准证:' + doc.dirverid + ';电话:' + doc.dirverphone + ';驾照:' + doc.dirvercard + ';用户名:' + doc.dirverusername + ';备注:' + doc.dirvernote + ';)'
                        })
                            .then(() => {
                                res.send({
                                    code: 0,
                                    msg: '添加司机成功'
                                })
                            })
                            .catch(err => {
                                console.log('catch an error while write log')
                                res.send({
                                    code: 2,
                                    msg: '添加司机时出现问题',
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
                Product.countDocuments({ "dirvername": { $regex: req.body.word, $options: 'i' } })
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

exports.staff_nameCh_nameEn = (req, res, next) => {
    Product.find({},{dirvername:-1,name_en:-1,_id:-1})
        .then(doc => {
            res.send({
                code:0,
                doc:doc
            })
        })
        .catch(err => {
            console.log(err)
            res.send({
                code:2,
                error:err
            })
        })
}
//获取权限为司机的中英文姓名
exports.roleIsDriver_nameCh_nameEn = (req, res, next) => {
    Product.find({role:'user'},{dirvername:-1,name_en:-1,_id:-1})
        .then(doc => {
            res.send({
                code:0,
                doc:doc
            })
        })
        .catch(err => {
            console.log(err)
            res.send({
                code:2,
                error:err
            })
        })
}

//司机查找机油报警 start
exports.staff_find_carOilWarning = (req, res, next) => {
    carModels.findOne({carid:req.body.carNo})
        .then(carInfo => {
            if(carInfo && carInfo.kelometer && carInfo.lastOilKelometer){
                settingModel.findOne()
                    .then(settingInfo => {
                        if(settingInfo){
                            if(carInfo.lastOilKelometer + settingInfo.oilProperty - settingInfo.engineOilValve < carInfo.kelometer){
                                res.send({
                                    code:0,
                                    lastOilKelometer:carInfo.lastOilKelometer,//最后更换机油时的公里数
                                    kelometer:carInfo.kelometer,//公里数
                                    oilProperty:settingInfo.oilProperty//机油性能
                                })
                            }else{
                                res.send({
                                    code:1
                                })
                            }
                        }else{
                            res.send({
                                code:3//未找到设置信息
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
//司机查找机油报警 end

//查找白班司机 start
exports.staff_find_dayShiftDriver = (req, res, next) => {
    Product.find({$or:[{role:"dayshift"},{role:"dayshiftLeader"}]} ,{dirvername:-1})
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
//查找白班司机 end
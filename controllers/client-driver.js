const Product = require('../models/mission')
const driverInfo = require('../models/dirver')
const smsControllers = require('../models/openSMS')
const clientbControllers = require('../models/clientb')
const logControllers = require('../models/log')
const myBasketModel = require('../models/basket')
const bcrypt = require('bcryptjs')
const Nexmo = require('nexmo')
const nexmo = new Nexmo({ apiKey: 'add855d7', apiSecret: '3t4Rz2GI67DGtgw2' });
const from = 'Ebuy Inc'

const text = '您的货品已送达'

exports.client_driver_get = (req, res, next) => {
    let tempdate = new Date().getTime()
    let startdate = tempdate - 86400000
    console.log(startdate)
    let enddate = tempdate + 86400000
    console.log(enddate)
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    Product.find({ "missiondirver": req.body.drivername, "missiondate": { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该任务信息'
                })
            } else {
                res.send({
                    code: 0,
                    msg: '查找任务成功',
                    doc: doc
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                msg: '删除时出现错误',
                error: err
            })
        })
}

exports.client_driver_upload = (req, res, next) => {

    Product.findOne({ _id: req.body._id })
        .then(doc => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该任务信息'
                })
            } else {
                Product.updateOne({
                    _id: req.body._id,
                    missionclient: {
                        $elemMatch: { clientbname: req.body.dialogClientName ,isReturn: req.body.isReturn,returnPool_id:req.body.returnPool_id}
                    }
                }, {
                        $set: { 'missionclient.$.finishphoto': req.file.path, 'missionclient.$.finishdate': new Date() },
                    })
                    .then(() => {
                        clientbControllers.findOne({ clientbname: req.body.dialogClientName })
                            .populate('clientbserve')
                            .then(doc2 => {
                                let tempNum = req.body.outBasket - req.body.inBasket
                                if (doc2.basket) {
                                    tempNum = doc2.basket + tempNum
                                }
                                clientbControllers.updateOne({ _id: doc2._id }, {
                                    basket: tempNum
                                })
                                    .then(() => {
                                        smsControllers.findOne({ 'clientId': doc2.clientbserve._id })
                                            .then(doc3 => {
                                                if (doc3) {
                                                    let to = '65' + doc2.clientbserve.clientaphone
                                                    nexmo.message.sendSms(from, to, text, (err, result) => {
                                                        if (err) {

                                                            logControllers.create({
                                                                logDate: new Date(),
                                                                logPlace: 'SMS send',
                                                                logMode: 'send error',
                                                                logInfo: '客户ID:' + doc2.clientbserve._id + ';客户名:' + doc2.clientbserve.clientaname + ';错误信息:' + err
                                                            })
                                                                .then(() => {
                                                                    console.log('发生错误:')
                                                                    console.log(err)
                                                                    res.send({
                                                                        code: 1,
                                                                        error: err,
                                                                        SMS: 'true'
                                                                    })
                                                                })
                                                                .catch(err => {
                                                                    console.log('生成日志时发生错误:')
                                                                    console.log(err)
                                                                })

                                                        } else {
                                                            logControllers.create({
                                                                logDate: new Date(),
                                                                logPlace: 'SMS send',
                                                                logMode: 'send succes',
                                                                logInfo: '客户ID:' + doc2.clientbserve._id + ';客户名:' + doc2.clientbserve.clientaname + ';发送号码:' + result.messages[0].to + ';status' + result.messages[0].status + ';network' + result.messages[0].network
                                                            })
                                                                .then(() => {
                                                                    res.send({
                                                                        code: 0,
                                                                        msg: '任务状态更新成功',
                                                                        SMS: 'true'
                                                                    })
                                                                })
                                                                .catch(err => {
                                                                    console.log('生成日志时发生错误:')
                                                                    console.log(err)
                                                                })
                                                        }
                                                    })
                                                } else {
                                                    res.send({
                                                        code: 0,
                                                        msg: '任务状态更新成功',
                                                        SMS: 'false'
                                                    })
                                                }
                                            })
                                            .catch(err => {
                                                console.log('查找SMS时发生错误')
                                                console.log(err)
                                                res.send({
                                                    code: 2,
                                                    error: err
                                                })
                                            })
                                    })
                                    .catch(err => {
                                        console.log('catch an error while count basket number')
                                        console(err)
                                    })

                            })
                            .catch(err => {
                                console.log(err)
                            })

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                msg: '查找时出现错误',
                error: err
            })
        })
}

exports.client_driver_changepsw = (req, res, next) => {
    driverInfo.findOne({ _id: req.body._id })
        .then((doc) => {
            bcrypt.compare(req.body.oldpassword, doc.dirverpsw)
                .then(bcdoc => {
                    if (bcdoc) {
                        let psw = bcrypt.hashSync(req.body.newpassword)
                        driverInfo.updateOne({ _id: req.body._id }, {
                            dirverpsw: psw
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

exports.driver_upload_checkPic = (req, res, next) => {
    Product.findOne({ _id: req.body._id })
        .then(doc => {
            let clientArray = doc.missionclient
            let checkClient //is need pic check
            clientArray.forEach(client => {
                if (client.clientbname == req.body.clientName) {
                    checkClient = client
                }
            })
            if (checkClient.isNeedPic) {
                res.send({
                    code: 1,
                    msg: '需要照片'
                })
            } else {
                Product.updateOne({
                    _id: req.body._id,
                    missionclient: {
                        $elemMatch: { clientbname: req.body.clientName ,isReturn: req.body.isReturn ,returnPool_id: req.body.returnPool_id}
                    }
                }, {
                        $set: { 'missionclient.$.finishdate': new Date(), 'missionclient.$.position': req.body.position },
                    })
                    .then(doc => {
                        let tempNum = req.body.outBasket - req.body.inBasket
                        clientbControllers.findOne({ clientbname: req.body.clientName }, { basket: 1 })
                            .then(oldNum => {
                                if (oldNum.basket) {
                                    tempNum = oldNum.basket + tempNum
                                }
                                clientbControllers.updateOne({ clientbname: req.body.clientName }, {
                                    basket: tempNum
                                })
                                    .then(updateInfo => {
                                        myBasketModel.create({
                                            date: req.body.date,//生成时间
                                            lineName: req.body.lineName,//线路名称
                                            clientName: req.body.clientName,
                                            driverName: req.body.driverName,//生成司机
                                            outBasket: req.body.outBasket,//拿给客户的框数
                                            inBasket: req.body.inBasket,//拿回的框数
                                        })
                                            .then(() => {
                                                res.send({
                                                    code: 0,
                                                    info: doc
                                                })
                                            })
                                            .catch(err => {
                                                console.log('catch an error while create basket info')
                                                console.log(err)
                                                res.send({
                                                    code: 2,
                                                    error: err
                                                })
                                            })

                                    })
                                    .catch(err => {
                                        console.log('catch an error while update client basket info')
                                        console.log(err)
                                        res.send({
                                            code: 2,
                                            error: err
                                        })
                                    })
                            })
                            .catch(err => {
                                console.log('catch an error while find client old basket number')
                                console.log(err)
                                res.send({
                                    code: 2,
                                    error: err
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
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

exports.driver_missionComplete = (req, res, next) => {
    Product.findById(req.body.mission_id)
        .then(doc => {
            let canFinish = true
            doc.missionclient.some(element => {
                if (!element.finishdate) {
                    canFinish = false
                    return true
                }
            })
            if (canFinish) {
                Product.updateOne({ _id: req.body.mission_id }, {
                    complete: true
                })
                    .then(() => {
                        res.send({
                            code: 0
                        })
                    })
                    .catch(err => {
                        console.log('catch an error while update mission')
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
                    })
            } else {
                res.send({
                    code: 1,
                    msg: 'please refresh page'
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find mission')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.driver_receipt_update = (req, res, next) => {
    Product.updateOne({ "_id": req.body.mission_id,"missionclient._id": req.body.clientArray_id},{
        $set: {"missionclient.$.receipt_date": req.body.finishDate,"missionclient.$.receipt_finish": true}
    })
    .then(doc => {
        if(doc.n ===1 && doc.ok === 1){
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
            code: 2
        })
    })
}
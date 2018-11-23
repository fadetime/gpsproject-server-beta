const Product = require('../models/client-driver')
const driverInfo = require('../models/dirver')
const smsControllers = require('../models/openSMS')
const clientbControllers = require('../models/clientb')
const logControllers = require('../models/log')
const bcrypt = require('bcryptjs')
const Nexmo = require('nexmo')
const nexmo = new Nexmo({ apiKey: 'add855d7', apiSecret: '3t4Rz2GI67DGtgw2' });
const from = 'Ebuy Inc'

const text = '您的货品已送达'

exports.client_driver_get = (req, res, next) => {
    console.log(req.body.startdate)
    let startdate = new Date(req.body.startdate).getTime()
    let enddate = startdate + 86400000
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    console.log(startdate)
    console.log(enddate)
    Product.find({ "missiondirver": req.body.drivername, "missiondate": { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该任务信息'
                })
            } else {
                console.log(doc)
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
                Product.update({
                    _id: req.body._id,
                    missionclient: {
                        $elemMatch: { clientbname: req.body.dialogClientName }
                    }
                }, {
                        $set: { 'missionclient.$.finishphoto': req.file.path, 'missionclient.$.finishdate': new Date() },
                    })
                    .then(() => {
                        clientbControllers.findOne({ clientbname: req.body.dialogClientName })
                            .populate('clientbserve')
                            .then(doc2 => {
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
    console.log('##################')
    console.log(req.body.position)
    console.log('##################')
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
                    code:1,
                    msg:'需要照片'
                })
            } else {
                Product.updateOne({
                    _id: req.body._id,
                    missionclient: {
                        $elemMatch: { clientbname: req.body.clientName }
                    }
                }, {
                        $set: { 'missionclient.$.finishdate': new Date(),'missionclient.$.position': req.body.position },
                    })
                    .then(doc => {
                        res.send({
                            code: 0,
                            info: doc
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
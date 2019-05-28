const dsDriverMissionModels = require('../models/dayShiftDriverMission')
const dayShiftMissionPool = require('../models/dayShiftMission')
const clientModels = require('../models/clientb')
const async = require("async")

exports.dayShiftDriver_create = (req, res, next) => {
    let stopFlag = false
    async function check_missionIsNew() {
        new Promise (() => {
            req.body.clientArray.some(element => {
                if (element.dayMission_id) {
                    stopFlag = true
                }
                return stopFlag
            });
        })
    }
    async function startCheck() {
        await check_missionIsNew()
    }
    startCheck()
    if (stopFlag) {
        res.send({
            code: 1,
            msg: '请求中包含已派送客户'
        })
    } else {
        dsDriverMissionModels
            .create(req.body)
            .then(doc => {
                if (doc) {
                    req.body.clientArray.forEach(element => {
                        dayShiftMissionPool.updateOne({ _id: element._id }, {
                            dayMission_id: doc._id,
                            driverName: req.body.driverName
                        })
                        .then(() => {
                            console.log('update pool mission success')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    });
                    res.send({
                        code: 0,
                        doc: doc._id
                    })
                } else {
                    res.send({
                        code: 1
                    })
                }
            })
            .catch(err => {
                console.log('catch an error while create day shift driver mission')
                console.log(err)
                res.send({
                    code: 2,
                    error: err
                })
            })
    }
}

exports.dayShiftDriver_removeClient = (req, res, next) => {
    console.log(req.body)
    dsDriverMissionModels.updateOne({ _id: req.body.mission_id }, {
        $pull: { clientArray: { clientName: req.body.clientName } }
    })
        .then(doc => {
            if (doc.nModified === doc.ok) {
                dayShiftMissionPool.updateOne({ dayMission_id: req.body.mission_id, clientName: req.body.clientName }, {
                    dayMission_id: null
                })
                    .then(doc2 => {
                        if (doc2.nModified === doc2.ok) {
                            res.send({
                                code: 0
                            })
                        } else {
                            res.send({
                                code: 1
                            })
                        }
                    })
                    .catch(err => {
                        console('catch an error while driver remove client')
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
                    })
            } else {
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log('catch an error while update client finish date')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.dayShiftDriver_updateMissionByDriver = (req, res, next) => {
    dsDriverMissionModels.updateOne({ _id: req.body._id }, {
        carPlate: req.body.carPlate,
        Car_id: req.body.Car_id,
        goTime: req.body.goTime
    })
        .then(doc => {
            res.send({
                code: 0
            })
        })
        .catch(err => {
            console.log('catch an error while update shift driver mission')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.dayShiftDriver_updateCheckCar = (req, res, next) => {
    dsDriverMissionModels.updateOne({ _id: req.body._id }, {
        carCheck_id: req.body.carCheck_id
    })
        .then(doc => {
            res.send({
                code: 0
            })
        })
        .catch(err => {
            console.log('catch an error while update shift driver mission')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.dayShiftDriver_updateClientFinishDate = (req, res, next) => {
    dsDriverMissionModels
        .updateOne({
            _id: req.body.mission_id, clientArray: {
                $elemMatch: { clientName: req.body.clientName }
            }
        }, {
                $set: { 'clientArray.$.finisDate': req.body.finisDate }
            })
            .then(() => {
                if(req.file){
                    dayShiftMissionPool
                        .updateOne({_id:req.body.pool_id},{
                            image:req.file.path,
                            isFinish: true,
                            finishDate:req.body.finisDate
                        })
                        .then(updateInfo => {
                            if(updateInfo.n === 1 && updateInfo.ok === 1){
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
                        })
                }else{
                    dayShiftMissionPool
                        .updateOne({_id:req.body.pool_id},{
                            isFinish: true,
                            finishDate:req.body.finisDate
                        })
                        .then(updateInfo => {
                            if(updateInfo.n === 1 && updateInfo.ok === 1){
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
                        })
                }
            })
            .catch(err => {
                console.log('catch an error while update client finish date')
                console.log(err)
                res.send({
                    code: 2,
                    error: err
                })
            })
}

exports.dayShiftDriver_updateFinishState = (req, res, next) => {
    dsDriverMissionModels.findOne({ _id: req.body.mission_id })
        .then(doc => {
            if (doc) {
                let notFinish = false
                let count = 0;
                async.whilst(
                    () => { return count < 1; },
                    (callback) => {
                        count++;
                        doc.clientArray.some(element => {
                            if (!element.finisDate) {
                                notFinish = true
                            }
                            return notFinish
                        })
                        callback(null, count);
                    },
                    (err, count) => {
                        if (!notFinish) {
                            doc.missionFinish = true
                            doc.save()
                            res.send({
                                code: 0
                            })
                        } else {
                            res.send({
                                code: 1
                            })
                        }
                    }
                );
            } else {
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log('catch an error while update client finish date')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.dayShiftDriver_findByDriver = (req, res, next) => {
    let startdate = new Date(req.body.today).toISOString()
    startdate = new Date(req.body.today).toLocaleDateString()
    let enddate = new Date(startdate).getTime() + 86400000
    startdate = new Date(startdate).getTime() - 86400000
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()

    dsDriverMissionModels.find({ driverName: req.body.driverName, orderDate: { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
            if (doc.length === 0) {
                res.send({
                    code: 1
                })
            } else {
                res.send({
                    code: 0,
                    doc: doc
                })
            }
            console.log(doc)
        })
        .catch(err => {
            console.log('catch an error while create day shift driver mission')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.dayShiftDriver_findMissionByID = (req, res, next) => {
    dsDriverMissionModels
        .findOne({ _id: req.body.mission_id })
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
            console.log('catch an error while find mission by id')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.dayShiftDriver_findMissionByDay = (req, res, next) => {
    let startDate = req.body.tripsDate
    let endDate = new Date(startDate).getTime()
    endDate = endDate + 86400000
    endDate = new Date(endDate).toISOString()
    dsDriverMissionModels
        .find({orderDate: { "$gte": startDate, "$lt": endDate }})
        .then(doc => {
            if(doc.length === 0){
                res.send({
                    code: 1
                })
            }else{
                res.send({
                    doc: doc,
                    code: 0
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

exports.dayShiftDriver_searchClient = (req, res, next) => {
    clientModels
        .find({ 'clientbname': { $regex: req.body.keyWord, $options: 'i' }},{
            clientbname: -1,
            clientbnameEN: -1,
            clientbaddress: -1,
            clientbphone: -1,
            clientbpostcode: -1
        })
        .limit(5)
        .then(doc => {
            if(doc.length === 0){
                res.send({
                    code: 1
                })
            }else{
                res.send({
                    code: 0,
                    doc: doc
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

exports.dayShiftDriver_addClient = (req, res, next) => {
    let startDate = req.body.orderDate
    let endDate = new Date().getTime()
    endDate = endDate + 86400000
    endDate = new Date(endDate).toISOString()
    dayShiftMissionPool
        .findOne({"orderDate":{ "$gte": startDate, "$lt": endDate },"client_id": req.body.client_id},{
            dayMission_id: -1,
            isFinish: -1
        })
        .then(poolInfo => {
            if(poolInfo){
                res.send({
                    code: 1,
                    doc: poolInfo
                })
            }else{
                if(req.body.isIncreaseOrder === 'increase'){
                    req.body.isIncreaseOrder = 'true'
                }else if(req.body.isIncreaseOrder === 'return'){
                    req.body.isIncreaseOrder = 'false'
                }else if(req.body.isIncreaseOrder === 'back'){
                    req.body.isIncreaseOrder = 'return'
                }else if(req.body.isIncreaseOrder === 'transport'){
                    req.body.isIncreaseOrder = 'delivery'
                }else{
                    req.body.isIncreaseOrder = 'other'
                }
                dayShiftMissionPool
                    .create({
                        client_id: req.body.client_id,//客户_id
                        dayMission_id: req.body.dayMission_id,//白班司机任务id
                        clientName: req.body.clientName,//客户名称
                        clientNameEN: req.body.clientNameEN,//英文名称
                        clientAddress: req.body.clientAddress,//客户地址
                        clientPhone: req.body.clientPhone,//客户电话
                        clientPostcode: req.body.clientPostcode,//客户邮编
                        isIncreaseOrder: req.body.isIncreaseOrder,//是否为加单，true 加单 false 补单 return 退单 delivery 运输  other 其他
                        driverName: req.body.driverName,//任务司机名
                        orderDate: req.body.orderDate,//订单生成日期
                        pool_id: null//任务池_id
                    })
                    .then(newPoolInfo => {
                        if(newPoolInfo){
                            newPoolInfo.save({pool_id:newPoolInfo._id})
                            dsDriverMissionModels
                                .updateOne({_id: req.body.dayMission_id},{
                                    $push:{"clientArray": {
                                        "client_id" : req.body.client_id,
                                        "note" : null,
                                        "image" : null,
                                        "isIncreaseOrder" : req.body.isIncreaseOrder,
                                        "finisDate" : null,
                                        "pool_id" : newPoolInfo._id,
                                        "clientName" : req.body.clientName,
                                        "clientNameEN" : req.body.clientNameEN,
                                        "clientAddress" : req.body.clientAddress,
                                        "clientPhone" : req.body.clientPhone,
                                        "clientPostcode" : req.body.clientPostcode
                                    }}
                                })
                                .then(doc => {
                                    if(doc.n === 1 && doc.ok === 1){
                                        res.send({
                                            code: 0
                                        })
                                    }else{
                                        res.send({
                                            code: 0,
                                            msg: 'catch an errror while update day shift driver mission'
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
            })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.dayShiftDriver_secondAddClient = (req, res, next) => {
    if(req.body.isIncreaseOrder === 'increase'){
        req.body.isIncreaseOrder = 'true'
    }else if(req.body.isIncreaseOrder === 'return'){
        req.body.isIncreaseOrder = 'false'
    }else if(req.body.isIncreaseOrder === 'back'){
        req.body.isIncreaseOrder = 'return'
    }else if(req.body.isIncreaseOrder === 'transport'){
        req.body.isIncreaseOrder = 'delivery'
    }else{
        req.body.isIncreaseOrder = 'other'
    }
    dayShiftMissionPool
        .create({
            client_id: req.body.client_id,//客户_id
            dayMission_id: req.body.dayMission_id,//白班司机任务id
            clientName: req.body.clientName,//客户名称
            clientNameEN: req.body.clientNameEN,//英文名称
            clientAddress: req.body.clientAddress,//客户地址
            clientPhone: req.body.clientPhone,//客户电话
            clientPostcode: req.body.clientPostcode,//客户邮编
            isIncreaseOrder: req.body.isIncreaseOrder,//是否为加单，true 加单 false 补单 return 退单 delivery 运输  other 其他
            driverName: req.body.driverName,//任务司机名
            orderDate: req.body.orderDate,//订单生成日期
            pool_id: null//任务池_id
        })
        .then(newPoolInfo => {
            if(newPoolInfo){
                newPoolInfo.save({
                    pool_id:newPoolInfo._id
                })
                dsDriverMissionModels
                    .updateOne({_id: req.body.dayMission_id},{
                        $push:{"clientArray": {
                            "client_id" : req.body.client_id,
                            "note" : null,
                            "image" : null,
                            "isIncreaseOrder" : req.body.isIncreaseOrder,
                            "finisDate" : null,
                            "pool_id" : newPoolInfo._id,
                            "clientName" : req.body.clientName,
                            "clientNameEN" : req.body.clientNameEN,
                            "clientAddress" : req.body.clientAddress,
                            "clientPhone" : req.body.clientPhone,
                            "clientPostcode" : req.body.clientPostcode
                        }}
                    })
                    .then(doc => {
                        res.send({
                            code: 0
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
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

exports.dayShiftDriver_removeTrpisAndPoolClient = (req, res, next) => {
    dsDriverMissionModels
        .deleteOne({_id: req.body.mission_id})
        .then(tripsInfo => {
            if(tripsInfo.n === 1 && tripsInfo.ok === 1){
                dayShiftMissionPool
                    .deleteMany({dayMission_id: req.body.mission_id})
                    .then(poolInfo => {
                        res.send({
                            code: 0
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
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

exports.dayShiftDriver_removeClientInTrips = (req, res, next) => {
    dsDriverMissionModels
        .updateOne({_id:req.body._id},{
            $pull: { clientArray: { _id: req.body.client_id } }
        })
        .then(doc => {
            console.log(doc)
            if(doc.n === 1 && doc.ok === 1){
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
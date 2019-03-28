//各种报表方法

const checkCar = require('../models/checkCar')
const MissionModels = require('../models/mission')
const myClientModels = require('../models/clientb')
const myMissionModels = require('../models/mission')
const myBasketModel = require('../models/basket')
const myCarWashModel = require('../models/carWash')
const areaBasketModel = require('../models/boxCount')
const breakBasketModel = require('../models/breakBoxReport')
const tripCountModel = require('../models/tripCount')
const timesModel = require('../models/times')
const repairCar = require('../models/fixCar')

exports.report_repairCar_byDate = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    let a = new Date(startdate).getTime()
    let b = new Date(enddate).getTime()
    let c = b - a
    if(c > 2678400000 ){
        res.send({
            code:3,
            msg:'时间范围过大'
        })
    }else{
        let tempInfo = {
            logStartTime:{
                "$gte": startdate, 
                "$lt": enddate
            }
        }
        repairCar.find(tempInfo)
            .then(doc => {
                console.log(doc)
                if(doc.length === 0){
                    res.send({
                        doc:doc,
                        code:1
                    })
                }else{
                    res.send({
                        doc:doc,
                        code:0
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
}


exports.report_get_byMoreDay = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    let a = new Date(startdate).getTime()
    let b = new Date(enddate).getTime()
    let c = b - a
    if(c > 2678400000 ){
        res.send({
            code:3,
            msg:'时间范围过大'
        })
    }else{
        let tempInfo = {
            missionDate:{
                "$gte": startdate, 
                "$lt": enddate
            }
        }
    timesModel.countDocuments()
        .then(tripsNum => {
            tripCountModel.find(tempInfo)
                .then(doc => {
                    if(doc.length === 0){
                        res.send({
                            code:1
                        })
                    }else{
                        res.send({
                            code:0,
                            doc:doc,
                            tripsNum:tripsNum
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
        })
        .catch(err => {
            console.log(err)
            res.send({
                code:2,
                error:err
            })
        })
    
    }
}

exports.report_get_byOneDay = (req, res, next) => {
    tripCountModel.findOne({missionDate:req.body.findDate})
        .then(doc => {
            if(doc){
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

exports.report_findBreakBasketByDate = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    let a = new Date(startdate).getTime()
    let b = new Date(enddate).getTime()
    let c = b - a
    if(c > 2678400000 ){
        res.send({
            code:3,
            msg:'时间范围过大'
        })
    }else{
        let tempInfo = {
            date:{
                "$gte": startdate, 
                "$lt": enddate
            }
        }
        breakBasketModel.find(tempInfo)
            .then(doc => {
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
            .catch(err => {
                console.log('catch an error while find car wash report')
                console.log(err)
                res.send({
                    code: 2,
                    error: err
                })
            })
    }
}

exports.report_findAreaBasketByDate = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    let a = new Date(startdate).getTime()
    let b = new Date(enddate).getTime()
    let c = b - a
    if(c > 2678400000 ){
        res.send({
            code:3,
            msg:'时间范围过大'
        })
    }else{
        let tempInfo = {
            date:{
                "$gte": startdate, 
                "$lt": enddate
            }
        }
        areaBasketModel.find(tempInfo)
            .then(doc => {
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
            .catch(err => {
                console.log('catch an error while find car wash report')
                console.log(err)
                res.send({
                    code: 2,
                    error: err
                })
            })
    }
}

exports.report_findCarWashByDate = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    let a = new Date(startdate).getTime()
    let b = new Date(enddate).getTime()
    let c = b - a
    if(c > 2678400000 ){
        res.send({
            code:3,
            msg:'时间范围过大'
        })
    }else{
        let tempInfo = {
            createDate:{
                "$gte": startdate, 
                "$lt": enddate
            }
        }
        if(req.body.creator){
            tempInfo['creator'] = req.body.creator
        }
        myCarWashModel.find(tempInfo)
            .then(doc => {
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
            .catch(err => {
                console.log('catch an error while find car wash report')
                console.log(err)
                res.send({
                    code: 2,
                    error: err
                })
            })
    }
}

exports.report_findBasket = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    let a = new Date(startdate).getTime()
    let b = new Date(enddate).getTime()
    let c = b - a
    if(c > 2678400000 ){
        res.send({
            code:3,
            msg:'时间范围过大'
        })
    }else{
        let tempInfo = {
            date:{
                "$gte": startdate, 
                "$lt": enddate
            }
        }
        if(req.body.driverName){
            tempInfo['driverName'] = req.body.driverName
        }
        if(req.body.lineName){
            tempInfo['lineName'] = req.body.lineName
        }
        if(req.body.clientName){
            tempInfo['clientName'] = req.body.clientName
        }
        myBasketModel.find(tempInfo)
        .then(doc => {
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
        .catch(err => {
            console.log('catch an error while find mission report by date')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
    }
}

exports.report_findMissionByDate = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    let a = new Date(startdate).getTime()
    let b = new Date(enddate).getTime()
    let c = b - a
    if(c > 2678400000 ){
        res.send({
            code:3,
            msg:'时间范围过大'
        })
    }else{
        myMissionModels.find({ 'missiondate': { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
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
        .catch(err => {
            console.log('catch an error while find mission report by date')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
    }
}

exports.report_findMissionByDateWithDriver = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    let a = new Date(startdate).getTime()
    let b = new Date(enddate).getTime()
    let c = b - a
    if(c > 2678400000 ){
        res.send({
            code:3,
            msg:'时间范围过大'
        })
    }else{
        myMissionModels.find({ 'missiondirver':req.body.driver,'missiondate': { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
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
        .catch(err => {
            console.log('catch an error while find mission report by date')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
    }
}

exports.report_findByDate = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    checkCar.find({ 'date': { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
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
        .catch(err => {
            console.log('catch an error while find report by date')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.report_getByDateOfdriver = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    checkCar.find({ 'driver': req.body.driverName, 'date': { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
            if (doc.length === 0) {
                res.send({
                    code: 1,
                    msg: '未找到数据'
                })
            } else {
                res.send({
                    code: 0,
                    doc: doc
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find checkCar by driver')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.report_getByDateOfAllDriver = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    checkCar.find({ $or: [{ wiper: false }, { headlight: false }, { mirror: false }, { tyre: false }, { backup: false }, { brake: false }, { petrolCard: false }, { text: { $ne: null } }, { clean: false }], 'date': { "$gte": startdate, "$lt": enddate } })
        .populate('car_id')
        .then(doc => {
            if (doc.length === 0) {
                res.send({
                    code: 1,
                    msg: '未找到数据'
                })
            } else {
                res.send({
                    code: 0,
                    doc: doc
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find checkCar by driver')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.report_getByDateOfdriverFindMission = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    MissionModels.find({ 'missiondirver': req.body.driverName, 'missiondate': { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
            if (doc.length === 0) {
                res.send({
                    code: 1,
                    msg: '未找到数据'
                })
            } else {
                res.send({
                    code: 0,
                    doc: doc
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find mission by driver')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.report_getBasketTop = (req, res, next) => {
    myClientModels.find({ basket: { "$gt": 1 } })
        .sort({ basket: -1 })
        .then(doc => {
            if (doc.length === 0) {
                res.send({
                    code: 1,
                    msg: '未找到数据'
                })
            } else {
                res.send({
                    code: 0,
                    doc: doc
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find mission by driver')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.report_getDriverCheckInfoByDate = (req, res, next) => {
    let startDate = new Date(req.body.startDate).toISOString()
    let endDate = new Date(req.body.endDate).toISOString()
    checkCar.find({ 'driver': req.body.driverName, 'date': { "$gte": startDate, "$lt": endDate } })
        .populate('car_id')
        .then(doc => {
            if (doc.length === 0) {
                res.send({
                    code: 1,
                    msg: '未找到数据'
                })
            } else {
                res.send({
                    code: 0,
                    doc: doc
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find mission by driver')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
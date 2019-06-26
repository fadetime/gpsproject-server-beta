const tripCountModel = require('../models/tripCount')
const lineModel = require('../models/times')
const missionModel = require('../models/mission')

exports.tripCount_create = (req, res, next) => {
    tripCountModel.findOne({missionDate:req.body.missionDate})
        .then(doc => {
            if(doc){
                res.send({
                    code:3,//任务已存在，发回客户端
                    doc:doc
                })
            }else{
                lineModel.countDocuments()
                    .then(lineNum => {
                        let tempArray = []
                        for (let index = 0; index < lineNum; index++) {
                            tempArray.push({
                                carNo: null,
                                out: null,
                                in: null,
                                lastEditDate: null
                            })
                        }
                        tripCountModel.create({
                            creater: req.body.creater,
                            creater_id: req.body.creater_id,//创建人_id
                            createDate: req.body.createDate,//创建时间
                            missionDate: req.body.missionDate,//任务时间
                            missionArray:tempArray
                        })
                            .then(doc => {
                                if (doc) {
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
                                console.log(err)
                                res.send({
                                    error: err,
                                    code: 2
                                })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.send({
                            error: err,
                            code: 2
                        })
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

exports.tripCount_edit = (req, res, next) => {
    tripCountModel.updateOne({_id:req.body.mission_id,"missionArray._id": req.body.array_id}, {
        $set: {
            "missionArray.$.carNo": req.body.carNo,
            "missionArray.$.driver_id": req.body.driver_id,
            "missionArray.$.driverNameCh": req.body.driverNameCh,
            "missionArray.$.driverNameEn": req.body.driverNameEn,
            "missionArray.$.out": req.body.out,
            "missionArray.$.outKm": req.body.outKm,
            "missionArray.$.in": req.body.in,
            "missionArray.$.inKm": req.body.inKm,
            "missionArray.$.lastEditDate": req.body.lastEditDate
        }
    })
        .then(doc => {
            console.log(doc)
            if(doc.ok === 1){
                res.send({
                    code:0
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

exports.tripCount_finish = (req, res, next) => {
    tripCountModel.updateOne({_id:req.body.mission_id},{
        finishDate:req.body.finishDate,
        finish:true
    })
        .then(doc => {
            console.log(doc)
            res.send({
                code:0
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

exports.tripCount_get = (req, res, next) => {
    tripCountModel.findOne({finish:false},{missionDate:-1,missionArray:-1,_id:-1})
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
                error:err,
                code:2
            })
        })
}

exports.tripCount_findTodayOldMission = (req, res, next) => {
    tripCountModel.findOne({missionDate:req.body.missionDate})
        .then(doc => {
            if(doc) {
                res.send({
                    doc:doc,
                    code:0
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

exports.tripCount_getOneDayInfo = (req, res, next) => {
    tripCountModel.findOne({missionDate:req.body.missionDate})
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

exports.tripCount_getOneMonthInfo = (req, res, next) => {
    let tempDate = new Date().setMonth(req.body.month)
    tempDate = new Date(tempDate).setDate(0)
    let maxDay = new Date(tempDate).getDate()
    let startdate = new Date().setMonth(req.body.month -1)
    startdate = new Date(startdate).setDate(1)
    startdate = new Date(startdate).toLocaleDateString()
    startdate = new Date(startdate).toISOString()
    let enddate = new Date().setMonth(req.body.month -1)
    enddate = new Date(enddate).setDate(maxDay)
    enddate = new Date(enddate).toLocaleDateString()
    enddate = new Date(enddate).toISOString()
    tripCountModel.find({missionDate:{ "$gte": startdate, "$lte": enddate }})
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
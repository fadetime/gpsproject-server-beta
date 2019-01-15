const dsDriverMissionModels = require('../models/dayShiftDriverMission')
const dayShiftMissionPool = require('../models/dayShiftMission')
const async = require("async")

exports.dayShiftDriver_create = (req, res, next) => {
    let stopFlag = false
    req.body.clientArray.some(element => {
        dayShiftMissionPool.findOne({ _id: element._id })
            .then(doc => {
                if (doc.dayMission_id) {
                    stopFlag = true
                }
            })
            .catch(err => {
                console.log('catch an error while mission pool client enable')
                console.log(err)
                res.send({
                    code: 2,
                    error: err
                })
            })
        return stopFlag
    });

    setTimeout(() => {
        if (stopFlag) {
            res.send({
                code: 1,
                msg: '请求中包含已派送客户'
            })
        } else {
            dsDriverMissionModels.create(req.body)
                .then(doc => {
                    if (doc) {
                        req.body.clientArray.forEach(element => {
                            dayShiftMissionPool.updateOne({ _id: element._id }, {
                                dayMission_id: doc._id,
                                driverName: req.body.driverName
                            })
                                .then(() => {
                                    console.log('更新任务池')
                                })
                                .then(err => {
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
    }, 1000);
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
    console.log(req.body)
    dsDriverMissionModels.updateOne({
        _id: req.body.mission_id, clientArray: {
            $elemMatch: { clientName: req.body.clientName }
        }
    }, {
            $set: { 'clientArray.$.finisDate': req.body.finisDate }
        })
        .then(doc => {
            console.log(doc)
            res.send({
                code: 0
            })
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
    dsDriverMissionModels.findOne({ _id: req.body.mission_id })
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
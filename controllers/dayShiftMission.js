const myDayShiftMission = require('../models/dayShiftMission')

exports.createMission = (req, res, next) => {
    myDayShiftMission.create(req.body)
        .then(doc => {
            res.send({
                code: 0
            })
        })
        .catch((err) => {
            console.log('catch an error while create a day shift mission')
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                error: err,
                code: 2
            })
        })
}

exports.removeMission = (req, res, next) => {
    myDayShiftMission.updateOne({ _id: req.body._id }, {
        isRemoved: true,
        removeReason: req.body.removeReason
    })
        .then(doc => {
            if (doc.ok === 1) {
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
            console.log('catch an error while remove a mission')
            console.log(err)
            res.send({
                error: err,
                code: 2
            })
        })
}

exports.startMIssion = (req, res, next) => {
    myDayShiftMission.updateOne({ _id: req.body._id }, {
        goTime:req.body.goTime
    })
    .then(doc => {
        if (doc.ok === 1) {
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
        console.log('catch an error while start a mission')
            console.log(err)
            res.send({
                error: err,
                code: 2
            })
    })
}

exports.endMIssion = (req, res, next) => {
    myDayShiftMission.updateOne({ _id: req.body._id }, {
        backTime:req.body.backTime
    })
    .then(doc => {
        if (doc.ok === 1) {
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
        console.log('catch an error while end a mission')
            console.log(err)
            res.send({
                error: err,
                code: 2
            })
    })
}

exports.findMissionByDate = (req, res, next) => {
    let startdate = new Date(req.body.orderDate).getTime() - 86400000
    let enddate = new Date(req.body.orderDate).getTime() + 86400000
    startdate = new Date(startdate).toISOString()
    console.log(startdate)
    enddate = new Date(enddate).toISOString()
    console.log(enddate)
    myDayShiftMission.find({"isRemoved":false, "driverName": req.body.driverName, "orderDate": { "$gte": startdate, "$lt": enddate } })
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
        })
        .catch(err => {
            console.log('catch an error while find a mission by the date')
            console.log(err)
            res.send({
                error: err,
                code: 2
            })
        })
}
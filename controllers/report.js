const checkCar = require('../models/checkCar')
const MissionModels = require('../models/mission')

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
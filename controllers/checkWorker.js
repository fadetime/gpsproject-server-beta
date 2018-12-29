const checkWorkerModel = require('../models/checkWorker')
const checkWorkerCarModel = require('../models/checkWorkerCar')

exports.checkWorker_create = (req, res, next) => {
    checkWorkerCarModel.find()
        .then(doc => {
            if (doc.length === 0) {
                res.send({
                    code: 1
                })
            } else {
                let tempArray = []
                doc.forEach(element => {
                    if (element) {
                        tempArray.push(element)
                    }
                });
                checkWorkerModel.create({
                    createDate: req.body.createDate,
                    missionCreator: req.body.driverName,
                    creator_id: req.body.driver_id,
                    missionList: tempArray
                })
                    .then(docs => {
                        console.log(docs)
                        res.send({
                            code: 0
                        })
                    })
                    .catch(err => {
                        console.log('##catch an error while create check car mission')
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            console.log('##catch an error while find check car mode')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })

}

exports.checkWorker_edit = (req, res, next) => {
    checkWorkerModel.updateOne({ _id: req.body._id, "missionList._id": req.body.data._id }, {
        $set: {
            "missionList.$.checkDate": req.body.time,
            "missionList.$.headlight": req.body.data.headlight,
            "missionList.$.brakeLight": req.body.data.brakeLight,
            "missionList.$.tyre": req.body.data.tyre,
            "missionList.$.petrolCard": req.body.data.petrolCard,
            "missionList.$.note": req.body.data.note
        }
    })
        .then(doc => {
            console.log(doc)
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
            console.log('##catch an error while find checkwork')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.checkWorker_finish = (req, res, next) => {
    checkWorkerModel.updateOne({ _id: req.body._id }, {
        finishDate: req.body.finishDate
    })
        .then(doc => {
            console.log(doc)
            res.send({
                code: 0
            })
        })
        .catch(err => {
            console.log('##catch an error while finish checkwork')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.checkWorker_get = (req, res, next) => {
    checkWorkerModel.findOne({ finishDate: null })
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
            console.log('##catch an error while find checkwork')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.checkWorker_findByDate = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()

    checkWorkerModel.find({ "createDate": { "$gte": startdate, "$lt": enddate } })
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
            console.log('##catch an error while find check info by the date')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
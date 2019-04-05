const checkWorkerDayShiftModel = require('../models/checkWorkerDayShift')
const carModel = require('../models/car')

//new
exports.checkWorker_get = (req, res, next) => {
    checkWorkerDayShiftModel.findOne({ finishDate: null })
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

exports.checkWorker_create = (req, res, next) => {
    carModel.find()
        .then(doc => {
            let tempArray = doc.map(item => {
                return {
                    'carPlate':item.carid,
                    'headlight':  true ,
                    'brakeLight': true,//刹车灯
                    'tyre': true,//车胎
                    'petrolCard': true,//油卡
                    'cart':true,//手推车
                    'drivingRecorder':true,//行车记录仪
                    'carWindow':true,//车窗
                    'taillight':true,//尾灯
                    'sideMirror':true,//后视镜
                    'note': null//备注
                }
            })
            checkWorkerDayShiftModel.create({
                createDate: req.body.createDate,
                missionCreator: req.body.driverName,
                creator_id: req.body.driver_id,
                missionList: tempArray
            })
                .then(() => {
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
        })
        .catch(err => {
            console.log(err)
            res.send({
                code:2,
                error:err
            })
        })
}

exports.checkWorker_edit = (req, res, next) => {
    checkWorkerDayShiftModel.updateOne({ _id: req.body._id, "missionList._id": req.body.data._id }, {
        $set: {
            "missionList.$.checkDate": req.body.time,
            "missionList.$.isFinish": req.body.isFinish,
            "missionList.$.headlight": req.body.data.headlight,
            "missionList.$.brakeLight": req.body.data.brakeLight,
            "missionList.$.tyre": req.body.data.tyre,
            "missionList.$.petrolCard": req.body.data.petrolCard,
            "missionList.$.note": req.body.data.note,
            "missionList.$.kilometer": req.body.data.kilometer,
            "missionList.$.cart": req.body.data.cart,
            "missionList.$.drivingRecorder": req.body.data.drivingRecorder,
            "missionList.$.carWindow": req.body.data.carWindow,
            "missionList.$.taillight": req.body.data.taillight,
            "missionList.$.sideMirror": req.body.data.sideMirror
        }
    })
        .then(doc => {
            if (doc.ok === 1) {
                carModel.updateOne({carid:req.body.data.carPlate},{
                    kelometer:req.body.data.kilometer
                })
                .then(() => {
                    res.send({
                        code: 0
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.send({
                        code:2,
                        error:err
                    })
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

exports.checkCar_change_engineOil = (req, res, next) => {
    carModel.updateOne({_id:req.body.car_id},{
        lastOilKelometer:req.body.newOilNum
    })
        .then(doc => {
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

exports.checkWorker_finish = (req, res, next) => {
    checkWorkerDayShiftModel.updateOne({ _id: req.body._id }, {
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

exports.checkCar_find_engineOil = (req, res, next) => {
    carModel.findOne({carid:req.body.carPlate},{lastOilKelometer:-1})
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

exports.checkWorker_findByDate = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()

    checkWorkerDayShiftModel.find({ "createDate": { "$gte": startdate, "$lt": enddate } })
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
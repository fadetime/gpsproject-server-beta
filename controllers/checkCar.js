const checkCar = require('../models/checkCar')
const mission = require('../models/mission')
const dsDriverMissionModels = require('../models/dayShiftDriverMission')
const carModels = require('../models/car')

exports.checkCar_create = (req, res, next) => {
    checkCar.create(req.body)
        .then((item) => {
            mission.updateOne({ _id: req.body.mission_id }, {
                carCheck_id: item._id,
                carCheckFirst: true
            })
                .then(() => {
                    res.send({
                        code: 0
                    })
                })
                .catch(err => {
                    console.log('##catch an error while update check status')
                    console.log(err)
                    res.send({
                        code: 2,
                        error: err
                    })
                })
        })
        .catch(err => {
            console.log('##catch an error while create check car log')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.dayShiftCheckCar_create = (req, res, next) => {
    checkCar.create(req.body)
        .then((item) => {
            dsDriverMissionModels.updateOne({ _id: req.body.mission_id }, {
                carCheck_id: item._id
            })
                .then(() => {
                    res.send({
                        code: 0
                    })
                })
                .catch(err => {
                    console.log('##catch an error while update check status')
                    console.log(err)
                    res.send({
                        code: 2,
                        error: err
                    })
                })
        })
        .catch(err => {
            console.log('##catch an error while create check car log')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.checkCar_get = (req, res, next) => {
    checkCar.find({ car_id: req.body.car_id })
        .then(doc => {
            checkCar.countDocuments({ car_id: req.body.car_id, finish: false })
                .then(errCarNum => {
                    if (!doc) {
                        res.send({
                            code: 1,
                            msg: '未找到该数据'
                        })
                    } else {
                        res.send({
                            code: 0,
                            errCarNum: errCarNum,
                            item: doc
                        })
                    }
                })
                .catch(err => {
                    console.log('##catch an error while find check car log')
                    console.log(err)
                    res.send({
                        code: 2,
                        error: err
                    })
                })
        })
        .catch(err => {
            console.log('##catch an error while find check car log')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.checkCar_getLastOne = (req, res, next) => {
    checkCar.findOne({car_id: req.body.car_id})
    .sort({'date':-1})
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
        console.log('catch an error while error')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.checkCar_getOne = (req, res, next) => {
    checkCar.findById(req.body.checkCar_id)
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
        console.log('catch an error while find one')
        console.log(err)
    })
}

exports.checkCar_edit = (req, res, next) => {
    checkCar.updateOne({ _id: req.body.carCheck_id }, {
        boxNumAgain: req.body.boxNumAgain,
        clean: req.body.clean,
        finishDate:req.body.finishDate
    })
        .then(() => {
            mission.updateOne({ _id: req.body.mission_id }, {
                carCheckFinish: true
            })
                .then(() => {
                    res.send({
                        code: 0
                    })
                })
                .catch(err => {
                    console.log('##catch an error while update mission check car status')
                    console.log(err)
                    res.send({
                        code: 2,
                        error: err
                    })
                })

        })
        .catch(err => {
            console.log('##catch an error while update check car log')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.checkCar_editByDayShift = (req, res, next) => {
    checkCar.updateOne({ _id: req.body.carCheck_id }, {
        boxNumAgain: req.body.boxNumAgain,
        clean: req.body.clean,
        finishDate:req.body.finishDate
    })
        .then(() => {
            dsDriverMissionModels.updateOne({_id:req.body.mission_id},{
                backTime:req.body.finishDate
            })
            .then(() => {
                console.log('finish')
                res.send({
                    code:0
                })
            })
            .catch(err => {
                console.log('##catch an error while update check car log')
                console.log(err)
                res.send({
                    code: 2,
                    error: err
                })
            })
        })
        .catch(err => {
            console.log('##catch an error while update check car log')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
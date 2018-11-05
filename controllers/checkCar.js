const checkCar = require('../models/checkCar')
const mission = require('../models/mission')

exports.checkCar_create = (req, res, next) => {
    checkCar.create(req.body)
        .then(() => {
            mission.updateOne({ _id: req.body.mission_id }, {
                CarCheck: true
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
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该数据'
                })
            } else {
                res.send({
                    code: 0,
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
}
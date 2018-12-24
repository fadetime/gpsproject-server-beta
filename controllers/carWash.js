const myCarWash = require('../models/carWash')

exports.carWash_create = (req, res, next) => {
    myCarWash.create(req.body)
        .then(doc => {
            if(doc){
                res.send({
                    code: 0,
                    doc:doc._id
                })
            }else{
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log('catch an error while create car wash info')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.carWash_edit = (req, res, next) => {
    myCarWash.updateOne({ _id: req.body._id }, {
        carPlate: req.body.carPlate,
        finishDate: req.body.finishDate,
        car_id: req.body.car_id
    })
        .then(doc => {
            console.log(doc)
            res.send({
                code: 0
            })
        })
        .catch(err => {
            console.log('catch an error while update car wash info')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.carWash_cancel = (req, res, next) => {
    myCarWash.updateOne({ _id: req.body._id }, {
        isRemoved: true,
        finishDate: req.body.finishDate,
        removeReason: req.body.removeReason
    })
        .then(doc => {
            console.log(doc)
            res.send({
                code: 0
            })
        })
        .catch(err => {
            console.log('catch an error while cancel car wash')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.carWash_find = (req, res, next) => {
    let startdate = new Date(req.body.createDate).getTime()
    let enddate = startdate + 86400000
    enddate = new Date(enddate).toISOString()
    myCarWash.findOne({
        creator: req.body.creator,
        createDate: { "$gte": req.body.createDate, "$lt": enddate }
    }, { _id: 1, finishDate: 1 })
        .then(doc => {
            if (doc) {
                if (doc.finishDate) {//完成 包含完成洗车和取消洗车
                    res.send({
                        code: 3
                    })
                } else {//有任务 但未完成
                    res.send({
                        code: 0,
                        doc: doc._id
                    })
                }
            } else {
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find car wash info')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
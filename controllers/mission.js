const Product = require('../models/mission')
const CarModels = require('../models/car')
const LineModels = require('../models/times')

exports.mission_get_one = (req, res, next) => {
    console.log(req.body)
    Product.findOne({ "_id": req.body._id })
        .then((doc) => {
            res.send(doc)
            console.log(doc)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                error: err
            })
        })
}

exports.mission_get_today = (req, res, next) => {
    let startdate = new Date(req.body.startdate).getTime()
    let enddate = startdate + 86400000
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    console.log(startdate)
    console.log(enddate)
    Product.find({ "missiondate": { "$gte": startdate, "$lt": enddate } })
        .then((doc) => {
            res.send(doc)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                error: err
            })
        })
}

exports.mission_create = (req, res, next) => {
    Product.create(req.body)
        .then((doc) => {
            CarModels.findOne({ 'carid': req.body.missioncar })
                .then(doc2 => {
                    let carCount = doc2.cartimes + 1
                    CarModels.updateOne({ 'carid': req.body.missioncar }, {
                        cartimes: carCount
                    })
                        .then(() => {
                            LineModels.findOne({ 'timesname': req.body.missionline })
                                .then(doc4 => {
                                    let lineCount = doc4.timescount + 1
                                    LineModels.updateOne({ 'timesname': req.body.missionline }, {
                                        timescount: lineCount
                                    })
                                        .then(() => {
                                            res.send({
                                                code: 0,
                                                msg: '创建任务成功'
                                            })
                                        })
                                        .catch(err => {
                                            console.log('更新路线信息时服务器发生错误')
                                            console.log(err)
                                            res.status(500).json({
                                                msg: '更新路线信息时服务器发生错误',
                                                error: err,
                                                code: 2
                                            })
                                        })
                                })
                                .catch(err => {
                                    console.log('查找路线信息时服务器发生错误')
                                    console.log(err)
                                    res.status(500).json({
                                        msg: '查找路线信息时服务器发生错误',
                                        error: err,
                                        code: 2
                                    })
                                })
                        })
                        .catch(err => {
                            console.log('更新车辆信息时服务器发生错误')
                            console.log(err)
                            res.status(500).json({
                                msg: '更新车辆信息时服务器发生错误',
                                error: err,
                                code: 2
                            })
                        })
                })
                .catch(err => {
                    console.log('获取车辆信息时服务器发生错误')
                    console.log(err)
                    res.status(500).json({
                        msg: '获取车辆信息时服务器发生错误',
                        error: err,
                        code: 2
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                err
            })
        })
}

exports.mission_remove = (req, res, next) => {
    Product.findOne({ _id: req.body.missionid })
        .then(doc => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该任务信息'
                })
            } else {
                CarModels.findOne({ 'carid': doc.missioncar })
                    .then(doc1 => {
                        let carCount = doc1.cartimes - 1
                        CarModels.update({ 'carid': doc.missioncar }, {
                            cartimes: carCount
                        })
                            .then(() => {
                                LineModels.findOne({ 'timesname': doc.missionline })
                                    .then(doc2 => {
                                        let lineCount = doc2.timescount - 1
                                        LineModels.updateOne({ 'timesname': doc.missionline }, {
                                            timescount: lineCount
                                        })
                                            .then(() => {
                                                Product.deleteOne({ _id: req.body.missionid })
                                                    .then(() => {
                                                        res.send({
                                                            code: 0,
                                                            msg: '删除任务成功'
                                                        })
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                        res.status(500).json({
                                                            msg: '删除数据时服务器发生错误',
                                                            err
                                                        })
                                                    })
                                            })
                                            .catch(err => {
                                                console.log('更新线路信息时服务器发生错误')
                                                console.log(err)
                                                res.status(500).json({
                                                    msg: '更新车线路息时服务器发生错误',
                                                    error: err,
                                                    code: 2
                                                })
                                            })
                                    })
                                    .catch(err => {
                                        console.log('获取线路信息时服务器发生错误')
                                        console.log(err)
                                        res.status(500).json({
                                            msg: '获取车线路息时服务器发生错误',
                                            error: err,
                                            code: 2
                                        })
                                    })
                            })
                            .catch(err => {
                                console.log('更新车辆信息时服务器发生错误')
                                console.log(err)
                                res.status(500).json({
                                    msg: '更新车辆信息时服务器发生错误',
                                    error: err,
                                    code: 2
                                })
                            })
                    })
                    .catch(err => {
                        console.log('获取车辆信息时服务器发生错误')
                        console.log(err)
                        res.status(500).json({
                            msg: '获取车辆信息时服务器发生错误',
                            error: err,
                            code: 2
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                msg: '删除时出现错误',
                error: err
            })
        })
}
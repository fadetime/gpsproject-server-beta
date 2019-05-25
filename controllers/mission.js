const Product = require('../models/mission')
const CarModels = require('../models/car')
const LineModels = require('../models/times')
const logControllers = require('../models/log')
const clientBModels = require('../models/clientb')
const async = require("async")

exports.mission_get_one = (req, res, next) => {
    Product.findOne({ "_id": req.body._id })
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

exports.mission_getOne_missionDateByid = (req, res, next) => {
    Product.findOne({ "_id": req.body._id })
        .then((doc) => {
            res.send(doc.missiondate)
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
        .then((missionDoc) => {
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
                                            let logOperator
                                            if (req.body.logOperator) {
                                                logOperator = req.body.logOperator
                                            } else {
                                                logOperator = 'name error'
                                            }
                                            logControllers.create({
                                                logDate: new Date().toISOString(),
                                                logOperator: logOperator,
                                                logPlace: 'mission',
                                                logMode: 'create',
                                                logInfo: '信息(' + '日期：' + req.body.missiondate + '名称：' + req.body.missionline + '备注：' + req.body.missionnote + ')'
                                            })
                                                .then(() => {
                                                    
                                                    //未来单信息更新 start
                                                    
                                                    LineModels.findOne({_id:req.body.line_id})
                                                        .populate({ path: 'timesclientb', populate: { path: 'clientbserve' } })
                                                        .populate({ path: 'timesclientb', populate: { path: 'clientbarea' } })
                                                        .then(doc => {
                                                            var count = 0;
                                                            let lineClientArray = []
                                                            let orderClientArray = []
                                                            let noOrderClientArray = []
                                                            doc.timesclientb.forEach(lientClient => {
                                                                lineClientArray.push(lientClient.clientbname)
                                                            });
                                                            req.body.missionclient.forEach(orderClient => {
                                                                orderClientArray.push(orderClient.clientbname)
                                                            });
                                                            noOrderClientArray = lineClientArray.concat(orderClientArray).filter(v =>{
                                                                return !lineClientArray.includes(v) || !orderClientArray.includes(v)
                                                            })
                                                            let tempDate = new Date(req.body.missiondate).toDateString()
                                                            tempDate = new Date (tempDate).getTime()
                                                            noOrderClientArray.forEach(item => {
                                                                clientBModels.findOne({clientbname:item})
                                                                .then(doc => {
                                                                    if(tempDate != doc.changeNoOrderDate){
                                                                        doc.noOrderDay ++
                                                                        doc.changeNoOrderDate = tempDate
                                                                        doc.save()
                                                                    }
                                                                })
                                                                .catch(err => {
                                                                    console.log(err)
                                                                })
                                                                
                                                            })
                                                            req.body.missionclient.forEach(element => {
                                                                clientBModels.updateOne({clientbname:element.clientbname},{
                                                                    noOrderDay:0,
                                                                    changeNoOrderDate:tempDate
                                                                })
                                                                .catch(err => {
                                                                    console.log(err)
                                                                })
                                                            });
                                                            res.send({
                                                                code: 0,
                                                                msg: '创建任务成功',
                                                                _id:missionDoc._id
                                                            })
                                                        })
                                                        .catch(err => {
                                                            console.log(err)
                                                            res.send({
                                                                code:2,
                                                                error:err
                                                            })
                                                        })
                                                    //未来单信息更新 end
                                                })
                                                .catch(err => {
                                                    console.log('catch an error while write log')
                                                    res.send({
                                                        code: 2,
                                                        msg: '创建任务时出现问题',
                                                        error: err
                                                    })
                                                    console.log(err)
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

exports.mission_editOne_missionDateByid = (req, res, next) => {
    Product.updateOne({_id:req.body._id},{
        missiondate:req.body.dateEdit
    })
    .then(doc => {
        console.log(doc)
        if(doc.ok === 1){
            res.send({
                code:0
            })
        }else{
            res.send({
                code:1,
                doc:doc
            })
        }
    })
    .catch(err => {
        console.log('catch an error while update mission date')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.mission_editOne_missionDriverByid = (req, res, next) => {
    Product.updateOne({_id:req.body._id},{
        missiondirver:req.body.driver
    })
    .then(doc => {
        if(doc.ok === 1){
            res.send({
                code:0
            })
        }else{
            res.send({
                code:1,
                doc:doc
            })
        }
    })
    .catch(err => {
        console.log('catch an error while update mission date')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.mission_addClient = (req, res, next) => {
    Product.updateOne({_id:req.body.mission_id},{
        "$addToSet":{"missionclient":req.body.obj}
    })
    .then(doc => {
        console.log(doc)
        res.send({
            code:0
        })
    })
    .catch(err => {
        console.log('catch an error while update mission')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

//任务增加客户并且排序相同名称
exports.mission_addClientAndSort = (req, res, next) => {
    console.log('##customer service add client _id')
    console.log(req.body.mission_id)
    console.log('##customer service add client _id')
    Product.updateOne({_id:req.body.mission_id},{
        $push:{ "missionclient":{$each:req.body.obj,$position: req.body.ClientPositionNum} }
    })
    .then(doc => {
        console.log('customer service add client')
        console.log(doc)
        console.log('customer service add client')
        res.send({
            code:0
        })
    })
    .catch(err => {
        console.log('catch an error while update mission')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.mission_delClient = (req, res, next) => {
    Product.updateOne({_id:req.body.mission_id},{
        "$pull":{"missionclient":req.body.obj}
    })
    .then(doc => {
        console.log(doc)
        res.send({
            code:0
        })
    })
    .catch(err => {
        console.log('catch an error while update mission')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.mission_remove = (req, res, next) => {
    Product.findById(req.body.missionid)
        .then(doc => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该任务信息'
                })
            } else {
                CarModels.findOne({ 'carid': doc.missioncar })
                    .then(doc1 => {
                        let carCount 
                        if(doc1){
                            carCount = doc1.cartimes - 1
                            console.log('1111')
                        }
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
                                                        let logOperator
                                                        if (req.body.logOperator) {
                                                            logOperator = req.body.logOperator
                                                        } else {
                                                            logOperator = 'name error'
                                                        }
                                                        logControllers.create({
                                                            logDate: new Date().toISOString(),
                                                            logOperator: logOperator,
                                                            logPlace: 'mission',
                                                            logMode: 'remove',
                                                            logInfo: '信息(' + doc + ')'
                                                        })
                                                            .then(() => {
                                                                res.send({
                                                                    code: 0,
                                                                    msg: '删除任务成功'
                                                                })
                                                            })
                                                            .catch(err => {
                                                                console.log('catch an error while write log')
                                                                res.send({
                                                                    code: 2,
                                                                    msg: '删除任务时出现问题',
                                                                    error: err
                                                                })
                                                                console.log(err)
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
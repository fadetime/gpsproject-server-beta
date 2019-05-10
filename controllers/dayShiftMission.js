const myDayShiftMission = require('../models/dayShiftMission')

exports.createMission = (req, res, next) => {
    myDayShiftMission.create(req.body)
        .then(doc => {
            if(doc){
                myDayShiftMission
                    .updateOne({_id:doc._id},{
                        pool_id:doc.id
                    })
                    .then(()=> {
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
                
            }else{
                res.send({
                    code:1
                })
            }
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
    console.log(req.body)
    let startdate = new Date(req.body.orderDate).toLocaleDateString()
    let enddate = new Date(startdate).getTime() + 86400000
    startdate = new Date(startdate).getTime()
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    console.log(startdate)
    console.log(enddate)
    myDayShiftMission.find({"isRemoved":false, "orderDate": { "$gte": startdate, "$lt": enddate } })
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

exports.findMissionByActive = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    myDayShiftMission.find({"isRemoved":false, "orderDate": { "$gte": startdate, "$lt": enddate } })
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

exports.thisMonthInfoReport = (req, res, next) => {
    let startDate = new Date().setDate(1)
    startDate = new Date(startDate).toDateString()
    startDate = new Date(startDate).setMonth(req.body.myMonth - 1)
    let endDate = new Date().setDate(1)
    endDate = new Date(endDate).toDateString()
    endDate = new Date(endDate).setMonth(req.body.myMonth)
    myDayShiftMission
        .countDocuments({orderDate:{"$gte": startDate, "$lt": endDate}})
        .then(allNum => {
            if(allNum){//所有单数
                myDayShiftMission
                    .countDocuments({isIncreaseOrder:'true',orderDate:{"$gte": startDate, "$lt": endDate}})
                    .then(increaseNum => {
                        if(increaseNum){//加单数
                            myDayShiftMission
                                .countDocuments({isIncreaseOrder:'false',orderDate:{"$gte": startDate, "$lt": endDate}})
                                .then(recoupNum => {
                                    if(recoupNum){//补单数
                                        myDayShiftMission
                                            .countDocuments({isIncreaseOrder:'return',orderDate:{"$gte": startDate, "$lt": endDate}})
                                            .then(returnNum => {
                                                if(returnNum){//退单数
                                                    myDayShiftMission
                                                        .countDocuments({isIncreaseOrder:'other',orderDate:{"$gte": startDate, "$lt": endDate}})
                                                        .then(otherNum => {//其他单数
                                                            if(otherNum){
                                                                res.send({
                                                                    code:0,
                                                                    allNum:allNum,
                                                                    increaseNum:increaseNum,
                                                                    recoupNum:recoupNum,
                                                                    returnNum:returnNum,
                                                                    otherNum:otherNum
                                                                })
                                                            }else{
                                                                res.send({
                                                                    code:1,
                                                                    msg:'catch an error while find other order documents'
                                                                })
                                                            }
                                                        })
                                                        .catch(err => {
                                                            console.log(err)
                                                        })
                                                }else{
                                                    res.send({
                                                        code:1,
                                                        msg:'catch an error while find return order documents'
                                                    })
                                                }
                                            })
                                            .catch(err => {
                                                console.log(err)
                                            })
                                    }else{
                                        res.send({
                                            code:1,
                                            msg:'catch an error while find recoup order documents'
                                        })
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }else{
                            res.send({
                                code:1,
                                msg:'catch an error while find increase order documents'
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else{
                res.send({
                    code:1,
                    msg:'catch an error while find this month all documents'
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}
const myDayShiftMission = require('../models/dayShiftMission')
const dsDriverMissionModels = require('../models/dayShiftDriverMission')

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
    let startdate = new Date(req.body.orderDate).toLocaleDateString()
    let enddate = new Date(startdate).getTime() + 86400000
    startdate = new Date(startdate).getTime()
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    let findDayMission_id = null
    let findFinishDate = null
    if(req.body.mode === 'mission'){
        findDayMission_id =  null
    }else if(req.body.mode === 'shipping'){
        findDayMission_id = {
            $ne: null
        }
        findFinishDate = null
    }else{
        findDayMission_id = {
            $ne: null
        }
        findFinishDate = {
            $ne: null
        }
    }
    myDayShiftMission
        .find({
            "isRemoved":false,
            "orderDate": { "$gte": startdate, "$lt": enddate },
            "dayMission_id": findDayMission_id, 
            "finishDate": findFinishDate
        })
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
    if(req.body.searchType == 'all'){
        req.body.searchType = {"$ne": null}
    }
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).getTime() + 86400000
    enddate = new Date(enddate).toISOString()
    myDayShiftMission.find({"isRemoved":false, "orderDate": { "$gte": startdate, "$lt": enddate },isIncreaseOrder: req.body.searchType })
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

//主管删除已分配的客户start
exports.leaderRemoveConfirguedClient = (req, res, next) => {
    myDayShiftMission
        .updateOne({ _id: req.body.pool_id }, {
            isRemoved: true,
            removeReason: '已分配后删除'
        })
        .then(doc => {
            if (doc.ok === 1) {
                dsDriverMissionModels
                    .findOne({_id:req.body.dayMission_id})
                    .then(dayDriverMissionInfo =>{
                        if(dayDriverMissionInfo){
                            if(dayDriverMissionInfo.clientArray.length === 1){
                                dsDriverMissionModels
                                    .deleteOne({_id:req.body.dayMission_id})
                                    .then(delInfo => {
                                        if(delInfo.n === 1 && delInfo.ok === 1){
                                            res.send({
                                                code: 0
                                            })
                                        }else{
                                            res.send({
                                                code: 1,
                                                msg:'del failed while find and remove day driver mission'
                                            })
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            }else{
                                let tempDate = null
                                async function findNeedDelClientInfo() {
                                    return new Promise(() => {
                                        dayDriverMissionInfo.clientArray.some(element => {
                                            if(element.pool_id === req.body.pool_id){
                                                tempDate = element
                                                console.log(tempDate)
                                                return true
                                            }
                                        });
                                    })
                                }
                                async function waitFindClient() {
                                        await findNeedDelClientInfo()
                                }
                                waitFindClient()
                                if(tempDate){
                                    dsDriverMissionModels
                                        .updateOne({_id:req.body.dayMission_id},{
                                            "$pull":{"clientArray":tempDate}
                                        })
                                        .then(delArrayInfo => {
                                            if(delArrayInfo.n === 1 && delArrayInfo.ok === 1){
                                                res.send({
                                                    code: 0
                                                })
                                            }else{
                                                res.send({
                                                    code: 1,
                                                    msg:'failed to delete properly'
                                                })
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        })
                                }else{
                                    res.send({
                                        code:1,
                                        msg:'foreach not found infomation'
                                    })
                                }
                            }
                        }else{
                            res.send({
                                code: 1,
                                msg:'查找白班司机任务时发生错误'
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
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
//主管删除已分配的客户end
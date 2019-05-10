const myCustomerServiceMission = require('../models/customerService')
const myMissionModels = require('../models/mission')
const clientModels = require('../models/clientb')

exports.findCSerrorID = (req, res, next) => {
    myCustomerServiceMission.findOne({mission_id:req.body.mission_id,clientName:req.body.clientName,finishiDate:req.body.finishiDate},{errorID:-1})
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
                error:err,
                code:2
            })
        })
}

exports.createCSMission = (req, res, next) => {
    myCustomerServiceMission
        .create(req.body)
        .then(doc => {
            if(doc){
                res.send({
                    code:0,
                    msg:'已放入任务池，建立夜班任务会自动加入',
                    taskID:doc._id
                })
            }else{
                res.send({
                    code: 1,
                    msg:'加入任务池错误'
                })
            }
        })
        .catch((err) => {
            console.log('catch an error while create customer service mission')
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                error: err,
                code: 2
            })
        })
}

exports.updateCSMission = (req, res, next) => {
    myCustomerServiceMission.updateOne({_id:req.body._id},{
        isFinish:true,
        mission_id:req.body.mission_id
    })
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.log('catch an error while update customer service mission')
        console.log(err)
    })
}

exports.updateFinishMission = (req, res, next) => {
    myCustomerServiceMission.updateOne({_id:req.body.returnPool_id},{
        isReturnDone:req.body.isReturnDone,
        finishiDate:req.body.finishiDate,
        driverNote:req.body.driverNote
    })
    .then(doc => {
        if(doc){
            res.send({
                code:0
            })
        } else {
            res.send({
                code:1
            })
        }
    })
    .catch(err => {
        console.log('catch an error while update customer service mission')
        console.log(err)
    })
}

exports.findCSMission = (req, res, next) => {
    let startdate = new Date(req.body.missionDate).getTime() 
    let enddate = startdate + 86400000
    startdate = startdate - 864000000 //10天
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    myCustomerServiceMission.find({isFinish:false,createDate:{ "$gte": startdate, "$lt": enddate }},{clientName:1,note:1})
        .then(doc => {
            if(doc.length === 0){
                res.send({
                    code: 1
                })
            }else{
                res.send({
                    code: 0,
                    doc:doc
                })
            }
        })
        .catch((err) => {
            console.log('catch an error while create customer service mission')
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                error: err,
                code: 2
            })
        })
}

exports.delCSerrorID = (req, res, next) => {
    myCustomerServiceMission.findByIdAndDelete(req.body.taskID)
        .then(doc => {
            console.log(doc)
            res.send({
                code:0
            })
        })
        .catch(err => {
            res.send({
                code:2,
                error:err
            })
        })
}

//白班查询客户
exports.dayShift_customerService_findClient = (req, res, next) => {
    clientModels.find({ "clientbname": { $regex: req.body.word, $options: 'i' } },{clientbname:-1,clientbphone:-1,clientbaddress:-1,clientbnameEN:-1,image:-1,clientbpostcode:-1})
    .limit(5)
    .then(doc => {
        console.log(doc)
        if(doc.length != 0){
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
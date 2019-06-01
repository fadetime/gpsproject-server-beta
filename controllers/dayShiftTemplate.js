//白班任务模板控制器
const dayShiftTemplate = require('../models/dayShiftTemplate')
const dsDriverMissionModels = require('../models/dayShiftDriverMission')
const dayShiftMissionPool = require('../models/dayShiftMission')
const axios = require('axios')

exports.createTemplate = (req, res, next) => {
    dayShiftTemplate
        .create(req.body)
        .then(doc => {
            if(doc){
                res.send({
                    code:0,
                    new_id:doc._id
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

exports.templateCreateMission = (req, res, next) => {
    let tempDate = []
    async function mapMissionClient() {
        return new Promise(() => {
            tempDate = req.body.clientArray.map(item => {
                return {
                    client_id: item.client_id,
                    clientName: item.clientName,
                    clientNameEN: item.clientNameEN,
                    clientAddress: item.clientAddress,//客户地址
                    clientPhone: item.clientPhone,//客户电话
                    clientPostcode: item.clientPostcode,//客户邮编
                    isIncreaseOrder: item.isIncreaseOrder//任务类型
                }
            })
        })
    }
    async function waitMap(){
        await mapMissionClient()
    }
    waitMap()
    dsDriverMissionModels
        .create({
            driverName: req.body.driverName,
            orderDate: req.body.date,
            missionFinish: false,
            clientArray: tempDate
        })
        .then(doc => {
            if(doc){
                res.send({
                    code: 0,
                    doc: doc
                })
                req.body.clientArray.map(item => {
                    let poolClient = {
                        client_id: item.client_id,//客户_id
                        dayMission_id: doc._id,//白班司机任务id
                        clientName: item.clientName,//客户名称
                        clientNameEN: item.clientNameEN,//英文名称
                        clientAddress: item.clientAddress,//客户地址
                        clientPhone: item.clientPhone,//客户电话
                        clientPostcode: item.clientPostcode,//客户邮编
                        isIncreaseOrder: item.isIncreaseOrder,//是否为加单，true 加单 false 补单 return 退单 other 其他
                        driverName: req.body.driverName,//任务司机名
                        orderDate: new Date().toISOString(),//订单生成日期
                    }
                    dayShiftMissionPool
                        .create(poolClient)
                        .then(newPoolClientInfo => {
                            dsDriverMissionModels
                                .updateOne({_id:doc._id, clientArray: {$elemMatch: { clientName: item.clientName }}
                                },{
                                    $set: { 'clientArray.$.pool_id': newPoolClientInfo._id }
                                })
                                .then(()=> {
                                    console.log('create pool client success')
                                })
                                .catch(err =>{
                                    console.log(err)
                                })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
            }else{
                res.send({
                    code: 1,
                    msg:'create day shift driver mission failed'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
    
}

exports.delTemplate = (req, res, next) => {
    dayShiftTemplate
        .deleteOne({_id:req.body._id})
        .then(doc => {
            if(doc.n === 1 && doc.ok === 1){
                res.send({
                    code: 0
                })
            }else{
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.updateTemplate = (req, res, next) => {
    dayShiftTemplate
        .updateOne({_id:req.body._id},{
            clientArray: req.body.clientArray
        })
        .then(doc => {
            if(doc.n === 1 && doc.ok === 1){
                res.send({
                    code:0,
                    doc:doc
                })
            }else{
                res.send({
                    code: 1
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

exports.findTemplate = (req, res, next) => {
    dayShiftTemplate
        .findOne({_id: req.body.id},{templateName: -1,clientArray:-1,matchBun: -1,match14: -1,match19: -1})
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

exports.findAllTemplate = (req, res, next) => {
    dayShiftTemplate
        .find({},{
            templateName: -1,
            clientArray: -1,
            matchBun: -1,
            match14: -1,
            match19: -1
        })
        .then(doc => {
            if(doc.length != 0){
                res.send({
                    code: 0,
                    doc: doc
                })
            }else{
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code:2,
                error: err
            })
        })
}

exports.changeMissionType = (req, res, next) => {
    dayShiftTemplate
        .updateOne({_id: req.body._id, clientArray: {$elemMatch: { _id: req.body.client_id }}},{
            $set: { 'clientArray.$.isIncreaseOrder': req.body.isIncreaseOrder }
        })
        .then(doc => {
            console.log(doc)
            res.send({
                code: 0
            })
        })
        .catch(err =>{
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.changeMatch = (req, res, next) => {
    console.log(req.body)
    dayShiftTemplate
        .updateOne({_id: req.body._id},{
            matchBun: req.body.matchBun,
            match14: req.body.match14,
            match19: req.body.match19
        })
        .then(doc => {
            if(doc.n === 1 && doc.ok === 1){
                res.send({
                    code: 0
                })
            }else{
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.getMatchInfo_match14 = (req, res, next) => {
    axios
        .post("http://3.1.39.240:4000/suppliers/getVegCarsCustomers",{
            "dateQuery": {
                "start": req.body.startDate,
                "end": req.body.endDate
            }
        })
        .then(doc => {
            console.log(doc.data)
            if(doc.data.status === 0){
                let tempData = null
                doc.data.payload.some(item => {
                    if(item.carNumber === '14'){
                        tempData = item
                        res.send({
                            code: 0,
                            doc: tempData.customers
                        })
                        return true
                    }
                })
            }else{
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.getMatchInfo_match19 = (req, res, next) => {
    axios
        .post("http://3.1.39.240:4000/suppliers/getVegCarsCustomers",{
            "dateQuery": {
                "start": req.body.startDate,
                "end": req.body.endDate
            }
        })
        .then(doc => {
            console.log(doc.data)
            if(doc.data.status === 0){
                let tempData = null
                doc.data.payload.some(item => {
                    if(item.carNumber === '19'){
                        tempData = item
                        res.send({
                            code: 0,
                            doc: tempData.customers
                        })
                        return true
                    }
                })
            }else{
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
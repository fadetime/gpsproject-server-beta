const bill = require('../models/bill')

exports.billCreate = (req, res, next) => {
    bill.create(req.body)
    .then(doc => {
        console.log(doc)
        if(doc) {
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
        console.log('catch an error while create bill count')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.billEdit = (req, res, next) => {
    bill.updateOne({_id:req.body._id},{
        endNum:req.body.endNum,
        driverNames:req.body.driverNames,
        endDate:req.body.endDate
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
        console.log('catch an error while edit bill count')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.billFind = (req, res, next) => {
    bill.findOne({'driverName':req.body.driverName,'endNum':null})
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
        console.log('catch an error while find bill count')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.billFindByDate = (req, res, next) => {
    let startdate = new Date(req.body.startDate).toISOString()
    let enddate = new Date(req.body.endDate).toISOString()
    bill.find({"date": { "$gte": startdate, "$lt": enddate },'hasReomved':false})
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
        console.log('catch an error while find bill count')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}
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
        endNum:req.body.endNum
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
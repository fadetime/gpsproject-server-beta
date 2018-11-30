const fixCar = require('../models/fixCar')

exports.fixCar_get = (req, res, next) => {
    fixCar.find({finish:false})
    .populate('car_id')
    .then(doc => {
        res.send({
            code:0,
            doc:doc
        })
    })
    .catch(err => {
        console.log('catch an error while find fix car log')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.fixCar_create = (req, res, next) => {
    fixCar.create(req.body)
    .then(() => {
        res.send({
            code:0
        })
    })
    .catch(err => {
        console.log('catch an error while create fix car log')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.fixCar_havePhoto_create = (req, res, next) => {
    if(req.file.path){
        req.body.image=req.file.path
    }
    req.body.image=req.file.path
    fixCar.create(req.body)
    .then(() => {
        res.send({
            code:0
        })
    })
    .catch(err => {
        console.log('catch an error while create fix car log')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}


exports.fixCar_edit = (req, res, next) => {
    fixCar.updateOne({_id:req.body._id},{
        finish:true
    })
    .then(() => {
        res.send({
            code:0
        })
    })
    .catch(err => {
        console.log('catch an error while update fix car log')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}
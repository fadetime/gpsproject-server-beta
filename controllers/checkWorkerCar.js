const checkWorkerCarModel = require('../models/checkWorkerCar')

exports.checkWorkerCar_create = (req, res, next) => {
    checkWorkerCarModel.create(req.body)
    .then(doc => {
        if(doc){
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
        console.log('##catch an error while create check car log')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
    })
}
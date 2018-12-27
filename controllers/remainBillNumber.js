const myRemainBillNumber = require('../models/remainBillNumber')

exports.remainBillNumber_find = (req, res, next) => {
    myRemainBillNumber.findOne()
        .then(doc => {
            if (doc) {
                res.send({
                    code: 0,
                    doc: doc
                })
            } else {
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find remain bill number')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
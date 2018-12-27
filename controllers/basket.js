const myBasket = require('../models/basket')

exports.basket_create = (req, res, next) => {
    myBasket.create(req.body)
        .then(doc => {
            if (doc) {
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
            console.log('catch an error while create basket info by driver')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
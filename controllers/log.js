const Product = require('../models/log')

exports.log_get_today = (req, res, next) => {
    let startdate = new Date(req.body.startdate).getTime()
    let enddate = startdate + 86400000
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    Product.find({ "logDate": { "$gte": startdate, "$lt": enddate } })
        .then((doc) => {
            res.send(doc)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                error: err
            })
        })
}
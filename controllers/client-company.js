const Product = require('../models/client-driver')

exports.client_company_get = (req, res, next) => {
    let startdate = new Date(req.body.startdate).getTime()
    let enddate = startdate + 86400000
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    Product.find({ "missiondate": { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该任务信息'
                })
            } else {
                let temparr = []
                doc.forEach(x => {
                    x.missionclient.forEach(y => {
                        if (y.clientbserve == req.body.username) {
                            temparr.push(y)
                        }
                    })
                })
                res.send({
                    code:0,
                    msg:'查找成功',
                    doc:temparr
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                msg: '删除时出现错误',
                error: err
            })
        })
}
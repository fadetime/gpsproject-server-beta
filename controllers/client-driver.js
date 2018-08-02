const Product = require('../models/client-driver')

exports.client_driver_get = (req, res, next) => {
    let startdate = new Date(req.body.startdate).getTime()
    let enddate = startdate + 86400000
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    Product.find({ "missiondirver": req.body.drivername, "missiondate": { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该任务信息'
                })
            } else {
                res.send({
                    code: 0,
                    msg: '查找任务成功',
                    doc: doc
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

exports.client_driver_upload = (req, res, next) => {

    Product.findOne({ _id: req.body._id })
        .then(doc => {
            if (!doc) {
                res.send({
                    code: 1,
                    msg: '未找到该任务信息'
                })
            } else {
                Product.update({
                    _id: req.body._id,
                    missionclient: {
                        $elemMatch:{clientbname: req.body.dialogClientName}}
                },{
                    $set:{'missionclient.$.finishphoto':req.file.path,'missionclient.$.finishdate':new Date()},
                })
                .then(doc2 => {
                    console.log('done')
                    res.send({
                        code:0,
                        msg:'任务状态更新成功'
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                msg: '查找时出现错误',
                error: err
            })
        })
}
const Product = require('../models/times')



exports.times_get_all = (req, res, next) => {
    Product.find()
        .populate('timescar')
        .populate('timesdirver')
        .populate({ path: 'timesclientb', populate: { path: 'clientbserve' } })
        .populate({ path: 'timesclientb', populate: { path: 'clientbarea' } })
        .then((doc) => {
            console.log(doc)
            res.send({
                doc,
                code: 0,
                msg: '数据获取成功'
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                err
            })
        })
}

exports.times_post_all = (req, res, next) => {
    Product.find()
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .populate('timescar')
        .populate('timesdirver')
        .populate({ path: 'timesclientb', populate: { path: 'clientbserve' } })
        .populate({ path: 'timesclientb', populate: { path: 'clientbarea' } })
        .then((doc) => {
            Product.count()
                .then(item => {
                    res.send({
                        msg: '计数成功',
                        code: 0,
                        count: item,
                        doc: doc
                    })
                })
                .catch(err => {
                    res.send({
                        msg: '计数时服务器发生错误',
                        error: err
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                err
            })
        })
}

exports.times_create_product = (req, res, next) => {
    Product.find({ 'timesname': req.body.timesname })
        .then((doc) => {
            if (doc.length != 0) {
                res.send({
                    code: 1,
                    msg: '此车次名已存在'
                })
            } else if (doc.length === 0) {
                Product.create(req.body)
                    .then((doc) => {
                        console.log(doc)
                        res.status(200).json({
                            code: 0,
                            msg: '添加成功'
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '添加时出现错误',
                            err
                        })
                    })
            } else {
                console.log('添加车次时服务器发生错误')
                res.status(500).json({
                    msg: '添加车次时服务器发生错误'
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.times_eidt = (req, res, next) => {
    Product.find({ _id: req.body._id })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该线路'
                })
            } else {
                Product.updateMany({ _id: req.body._id }, {
                    timesname: req.body.timesname,
                    timescar: req.body.timescar,
                    timesdirver: req.body.timesdirver,
                    timesclientb: req.body.timesclientb,
                    timesclientnumber: req.body.timesclientnumber,
                    timesnote: req.body.timesnote
                })
                    .then(() => {
                        res.send({
                            code: 0,
                            msg: '更新成功'
                        })
                    })
                    .catch((err) => {
                        console.log('更新时出现问题')
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '更新时出现问题'
                        })
                    })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                err
            })
        })
}

exports.times_remove = (req, res, next) => {
    Product.find({ _id: req.body._id })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该线路'
                })
            } else {
                Product.remove({ _id: req.body._id })
                    .then(() => {
                        res.send({
                            code: 0,
                            msg: '删除成功'
                        })
                    })
                    .catch((err) => {
                        console.log('删除时发生错误')
                        console.log(err)
                        res.send({
                            code: 2,
                            msg: '删除时发生错误',
                            error: err
                        })
                    })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                err
            })
        })
}

exports.times_find = (req, res, next) => {
    Product.find({'timesname':{ $regex: req.body.word, $options: 'i' }})
        .limit(req.body.pageSize)
        .skip(req.body.pageSize * (req.body.pageNow - 1))
        .populate('timescar')
        .populate('timesdirver')
        .populate({ path: 'timesclientb', populate: { path: 'clientbserve' } })
        .then((doc) => {
            if (doc.length == 0) {
                res.send({
                    code: 1,
                    msg: '未找到该数据'
                })
            }else{
                Product.count({'timesname':{ $regex: req.body.word, $options: 'i' }})
                .then(item => {
                    res.send({
                        msg: '计数成功',
                        code: 0,
                        count: item,
                        doc: doc
                    })
                })
                .catch(err => {
                    res.send({
                        msg: '计数时服务器发生错误',
                        error: err
                    })
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '获取数据时服务器发生错误',
                err
            })
        })
}
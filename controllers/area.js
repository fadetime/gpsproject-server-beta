const Product = require('../models/area')

exports.area_get_all = (req, res, next) => {
    Product.find()
        .then(doc => {
            res.send({
                code: 0,
                doc: doc
            })
        })
        .catch(err => {
            console.log('查找区域时出现错误')
            console.log(err)
            res.send({
                code: 2,
                error: err,
                msg: '查找区域时出现错误'
            })
        })
}

exports.area_create = (req, res, next) => {
    Product.findOne({ areaName: req.body.areaName })
        .then(doc => {
            if (doc) {
                res.send({
                    code: 1,
                    msg: '该区域已存在'
                })
            } else {
                Product.create({
                    areaName: req.body.areaName,
                    areaDescription: req.body.areaDescription
                })
                    .then(() => {
                        res.send({
                            code: 0
                        })
                    })
                    .catch(err => {
                        console.log('建立区域时出现错误')
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err,
                            msg: '建立区域时出现错误'
                        })
                    })
            }
        })
        .catch(err => {
            console.log('查找区域时出现错误')
            console.log(err)
            res.send({
                code: 2,
                error: err,
                msg: '查找区域时出现错误'
            })
        })

}

exports.area_update = (req, res, next) => {
    Product.find({ areaName: req.body.areaName })
        .then(doc => {
            let tempData = doc.filter((item) => {
                return item._id != req.body._id
            })
            if (tempData.length != 0) {
                res.send({
                    code: 1,
                    msg: '该名称已存在'
                })
            } else {
                Product.updateOne({_id:req.body._id},{
                    areaName:req.body.areaName,
                    areaDescription:req.body.areaDescription
                })
                .then(() => {
                    res.send({
                        code:0
                    })
                })
                .catch(err => {
                    res.send({
                        code: 2,
                        error: err,
                        msg: '更新区域时出现错误'
                    })
                })
            }
        })
        .catch(err => {
            res.send({
                code: 2,
                error: err,
                msg: '查找区域时出现错误'
            })
        })
}

exports.area_remove = (req, res, next) => {
    Product.deleteOne({_id:req.body._id})
    .then(() => {
        res.send({
            code: 0
        })
    })
    .catch(err => {
        res.send({
            code: 2,
            error: err,
            msg: '删除区域时出现错误'
        })
    })
}
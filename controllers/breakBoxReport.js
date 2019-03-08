const breakBoxReport = require('../models/breakBoxReport')
const fs = require('fs')

exports.breakBoxReport_create = (req, res, next) => {
    breakBoxReport.create({
        date: req.body.date,
        basketNum: req.body.basketNum,
        note: req.body.note,
        image: req.file.path,
        submitter: req.body.submitter,
        submitter_id: req.body.submitter_id
    })
        .then(doc => {
            if (doc) {
                res.send({
                    code: 0,
                })
            } else {
                res.send({
                    code: 1,
                })
            }
        })
        .catch(err => {
            console.log('catch an error while create breakBoxReport')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

//用户删除未审批申请
exports.breakBoxReport_delWithUser = (req, res, next) => {
    breakBoxReport.deleteOne({_id:req.body._id,confirm:null})
        .then(doc => {
            console.log(doc)
            if(doc.ok === 1){
                let fileName = req.body.image.slice(20)
                fs.unlink('./uploads/breakBasket/' + fileName, err => {
                    if (err) {
                        return console.log(err)
                    } else {
                        console.log('image del done')
                    }
                })
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
            console.log('catch an error while del breakBoxReport')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.breakBoxReport_findForUser = (req, res, next) => {
    breakBoxReport.find({
        submitter_id: req.body.submitter_id,
        confirm: null
    })
        .then(doc => {
            if (doc.length != 0) {
                res.send({
                    doc: doc,
                    code: 0
                })
            } else {
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find break box report for user')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.breakBoxReport_findNew = (req, res, next) => {
    breakBoxReport.find({ confirm: null })
        .then(doc => {
            if (doc.length != 0) {
                res.send({
                    doc: doc,
                    code: 0
                })
            } else {
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find new report')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.breakBoxReport_approval = (req, res, next) => {
    console.log(req.body.result)
    let result = null
    if (req.body.result === 'agree') {
        result = true
    } else {
        result = false
    }
    breakBoxReport.updateOne({ _id: req.body._id }, {
        confirm: result,
        approver:req.body.approver,
        approver_id:req.body.approver_id,
        finishDate:req.body.finishDate
    })
        .then(doc => {
            console.log(doc)
            if(doc){
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
            console.log('catch an error while approval new report')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.breakBoxReport_old_10item = (req, res, next) => {
    breakBoxReport.find({confirm:{$ne:null}})
        .sort({finishDate:-1})
        .limit(10)
        .skip(10 * (req.body.pageNow - 1))
        .then(doc => {
            if(doc.length !=0){
                res.send({
                    doc: doc,
                    code: 0
                })
            } else {
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find old report')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.breakBoxReport_old_3day = (req, res, next) => {
    let tempdate = req.body.date
    tempdate = new Date(tempdate).toDateString()
    tempdate = new Date(tempdate).getTime()
    let startdate = tempdate - 86400000
    console.log(startdate)
    let enddate = tempdate + 86400000
    console.log(enddate)
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    breakBoxReport.find({ confirm: { $ne: null }, date: { "$gte": startdate, "$lt": enddate } })
        .then(doc => {
            if (doc.length != 0) {
                res.send({
                    doc: doc,
                    code: 0
                })
            } else {
                res.send({
                    code: 1
                })
            }
        })
        .catch(err => {
            console.log('catch an error while find old report for 3day')
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
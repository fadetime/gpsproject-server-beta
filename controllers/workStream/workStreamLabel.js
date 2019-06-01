const workStreamLabelModels = require('../../models/workStream/workStream_label')

exports.workStream_label_createLabel = (req, res, next) => {
    workStreamLabelModels
        .create({
            "name": req.body.labelName,
            "date": req.body.labelDate 
        })
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
        .catch((err) => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.workStream_label_findLabel = (req, res, next) => {
    workStreamLabelModels
        .find()
        .then(doc =>{
            if(doc.length === 0){
                res.send({
                    code: 1
                })
            }else{
                res.send({
                    code: 0,
                    doc: doc
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}
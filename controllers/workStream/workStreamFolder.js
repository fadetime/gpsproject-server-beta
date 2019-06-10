const workStreamFolderModels = require('../../models/workStream/workStream_folder')

exports.workStream_folder_create = (req, res, next) => {
    workStreamFolderModels
        .create({
            date: req.body.date,
            name: req.body.name
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
        .catch(err =>{
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.workStream_folder_createChild = (req, res, next) => {
    workStreamFolderModels
        .create({
            date: req.body.date,
            name: req.body.name,
            child: true
        })
        .then(doc => {
            if(doc){
                workStreamFolderModels
                    .updateOne({"_id": req.body._id},{
                        $push:{"content": {
                            child_id: doc._id,
                            name: doc.name,
                            forder: true
                        }}
                    })
                    .then(updateInfo => {
                        console.log(updateInfo)
                        res.send({
                            code: 0
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.send({
                            code: 2,
                            error: err
                        })
                    })
            }else{
                res.send({
                    code: 1
                })
            }
        })
        .catch(err =>{
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

exports.workStream_folder_find = (req, res, next) => {
    workStreamFolderModels
        .findOne({"_id": req.body._id})
        .then(doc => {
            if(doc){
                res.send({
                    code: 0,
                    doc: doc
                })
            }else{
                res.send({
                    code: 1
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
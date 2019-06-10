const workStreamMissionModels = require('../../models/workStream/workStream_mission')
const workStreamFolderModels = require('../../models/workStream/workStream_folder')

exports.workStream_mission_create = (req, res, next) => {
    workStreamMissionModels
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

exports.workStream_mission_createChild = (req, res, next) => {
    console.log('child stream')
    workStreamMissionModels
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
                            forder: false
                        }}
                    })
                    .then(folderInfo =>{
                        if(folderInfo.n === 1 && folderInfo.ok === 1){
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
                        console.log(err)
                        res.send({
                            code: 2,
                            error:err
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
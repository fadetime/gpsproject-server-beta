const workStreamMissionModels = require('../../models/workStream/workStream_mission')

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
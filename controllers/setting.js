const settingModel = require('../models/setting')

//add
exports.setting_create = (req, res, next) => {
    settingModel.deleteMany()
        .then(() => {
            settingModel.create({
                engineOilValve:100,
                oilProperty:5000
            })
                .then(doc => {
                    console.log(doc)
                    if(doc){
                        res.send({
                            code: 0
                        })
                    }else{
                        res.send({
                            code: 3,
                            error:'建立临界值失败'
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
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

//edit
exports.setting_change = (req, res, next) => {
    settingModel.findOne()
        .then(docInfo => {
            docInfo.engineOilValve = req.body.engineOilValve
            docInfo.oilProperty = req.body.oilProperty
            docInfo.save()
                .then(saveInfo => {
                    if(saveInfo){
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
                    console.log(err)
                    res.send({
                        code: 2,
                        error: err
                    })
                })
        })
        .catch(err => {
            console.log(err)
            res.send({
                code: 2,
                error: err
            })
        })
}

//find
exports.setting_find = (req, res, next) => {
    settingModel.findOne()
        .then(doc => {
            if(doc){
                res.send({
                    code:0,
                    doc:doc
                })
            }else{
                res.send({
                    code:1,
                    error:'请初始化软件'
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
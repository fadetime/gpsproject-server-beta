const settingModel = require('../models/setting')
const adminModels = require('../models/admin')
const bcrypt = require('bcryptjs')

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

// 增加客服账户
exports.setting_createUser = (req, res, next) => {
    adminModels
        .findOne({email:req.body.userName})
        .then(doc => {
            if(doc){
                res.send({
                    code:3
                })
            }else{
                let hashPsw = bcrypt.hashSync(req.body.userPassword)
                adminModels
                    .create({
                        name:req.body.staffName,
                        email:req.body.userName,
                        phone:1,
                        password: hashPsw,
                        role:'customerService',
                        entryDate:new Date()
                    })
                    .then(doc => {
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
                        console.log(err)
                        res.send({
                            code:2,
                            error:err
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.send({
                code:2
            })
        })
}

//删除客服账号
exports.setting_removeUser = (req, res, next) => {
    adminModels
        .deleteOne({_id:req.body.user_id})
        .then(doc => {
            if(doc.n === 1 && doc.ok === 1){
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
                code:2,
                error:err
            })
        })
}

// 修改客户账号
exports.setting_editUser = (req, res, next) => {
    adminModels
        .countDocuments({email:req.body.userName})
        .then(doc => {
            if(doc >= 2){
                res.send({
                    code:1
                })
            }else{
                let updateInfo = null
                if(req.body.userPassword){
                    let hashPsw = bcrypt.hashSync(req.body.userPassword)
                    updateInfo = {
                        name:req.body.staffName,
						email:req.body.userName,
						password:hashPsw
                    }
                }else{
                    updateInfo = {
                        name:req.body.staffName,
						email:req.body.userName
                    }
                }
                adminModels
                    .updateOne({ _id: req.body.user_id },updateInfo)
                    .then(updateDoc => {
                        if(updateDoc.n === 1 && updateDoc.ok === 1){
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
                            error:err,
                            code:2
                        })
                    })
            }
        })
        .catch(err => {
            res.send({
                error:err,
                code:2
            })
        })
}

// 获取客户账号
exports.setting_findUser = (req, res, next) => {
    adminModels
        .find({"role" : "customerService"},{name:-1,email:-1,entryDate:-1})
        .then(doc => {
            if(doc.length != 0){
                res.send({
                    code:0,
                    doc:doc
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
                code:2,
                error:err
            })
        })
}


const fixCar = require('../models/fixCar')

exports.fixCar_get = (req, res, next) => {
    fixCar.find({finish:false})
    .populate('car_id')
    .then(doc => {
        res.send({
            code:0,
            doc:doc
        })
    })
    .catch(err => {
        console.log('catch an error while find fix car log')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.fixCar_create = (req, res, next) => {
    fixCar.create(req.body)
    .then(() => {
        res.send({
            code:0
        })
    })
    .catch(err => {
        console.log('catch an error while create fix car log')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.fixCar_havePhoto_create = (req, res, next) => {
    if(req.file.path){
        req.body.image=req.file.path
    }
    req.body.image=req.file.path
    fixCar.create(req.body)
    .then(() => {
        res.send({
            code:0
        })
    })
    .catch(err => {
        console.log('catch an error while create fix car log')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}


exports.fixCar_edit = (req, res, next) => {
    fixCar.updateOne({_id:req.body._id},{
        finish:true
    })
    .then(() => {
        res.send({
            code:0
        })
    })
    .catch(err => {
        console.log('catch an error while update fix car log')
        console.log(err)
        res.send({
            code:2,
            error:err
        })
    })
}

exports.fixCar_clientFirstReport = (req, res, next) => {
    fixCar
        .countDocuments({finish:false})
        .then(needDoNum => {
            let startDate = new Date().setDate(1)
            startDate = new Date(startDate).toDateString()
            startDate = new Date(startDate).setMonth(req.body.myMonth - 1)
            let endDate = new Date().setDate(1)
            endDate = new Date(endDate).toDateString()
            endDate = new Date(endDate).setMonth(req.body.myMonth)
            fixCar
                .find({logStartTime:{"$gte": startDate, "$lt": endDate}})
                .populate('car_id')
                .then(allNum => {
                    let maxName = null
                    let maxNum = 0
                    let temp_id = null
                    async function stepOneMethod() {
                        new Promise (() => {
                            let shippingArray = []
                            allNum.forEach(element => {
                                if(element.backup === 1 || element.brake === 1 ||element.headlight === 1 ||element.mirror === 1 ||element.other === 1 ||element.tyre === 1 ||element.wiper === 1){
                                    let flag = false
                                    let index = -1
                                    let tempName = element.car_id.carid
                                    if(shippingArray.length != 0){
                                        shippingArray.some(info => {
                                            index = index + 1
                                            if(info.name === tempName){
                                                flag = true
                                                shippingArray[index].value += 1
                                            }
                                            return flag
                                        })
                                    }
                                    if(!flag){
                                        shippingArray.push({
                                            name: tempName,
                                            value:1,
                                            _id:element.car_id
                                        })
                                    }
                                }
                            });
                            maxNum = Math.max.apply(null,shippingArray.map(info => {
                                return info.value
                            }))
                            
                            shippingArray.some(info => {
                                if(info.value === maxNum){
                                    maxName = info.name
                                    temp_id = info._id
                                    return true
                                }
                            })
                        })
                    }
                    async function setpTwoMethod() {
                        await stepOneMethod()
                    }
                    setpTwoMethod()
                        .then(()=> {
                            res.send({
                                code:0,
                                needDoNum:needDoNum,
                                allNum:allNum.length,
                                maxName:maxName,
                                maxNum:maxNum,
                                temp_id:temp_id
                            })
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.send({
                        code:2,
                        error:err
                    })
                })
        })
        .catch(err => {
            console.log(err)
            res.send({
                error:err,
                code:2
            })
        })
}

exports.fixCar_thisMonthMaxBreakCarReport = (req, res, next) => {
    let startDate = new Date().setDate(1)
    startDate = new Date(startDate).toDateString()
    startDate = new Date(startDate).setMonth(req.body.myMonth - 1)
    let endDate = new Date().setDate(1)
    endDate = new Date(endDate).toDateString()
    endDate = new Date(endDate).setMonth(req.body.myMonth)
    fixCar
        .find({car_id:req.body.car_id,logStartTime:{"$gte": startDate, "$lt": endDate}})
        .populate('car_id')
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

exports.fixCar_notReadyRepairInfo = (req, res, next) => {
    fixCar
        .find({finish:false})
        .populate('car_id')
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

exports.fixCar_thisMonthInfo = (req, res, next) => {
    let startDate = new Date().setDate(1)
    startDate = new Date(startDate).toDateString()
    startDate = new Date(startDate).setMonth(req.body.myMonth - 1)
    let endDate = new Date().setDate(1)
    endDate = new Date(endDate).toDateString()
    endDate = new Date(endDate).setMonth(req.body.myMonth)
    fixCar
        .find({logStartTime:{"$gte": startDate, "$lt": endDate}})
        .populate('car_id')
        .then(doc => {
            if(doc.length > 0){
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
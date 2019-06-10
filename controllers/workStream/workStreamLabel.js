const workStreamLabelModels = require('../../models/workStream/workStream_label')
const workStreamFolderModels = require('../../models/workStream/workStream_folder')
const workStreamMissionModels = require('../../models/workStream/workStream_mission')

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

exports.workStream_label_findLabelContent = (req, res, next) => {
    workStreamLabelModels
        .findOne({_id: req.body.labelInfo._id})
        .then(doc => {
            if(doc.isSpecial){//查询默认标签
                console.log('enter if')
                workStreamFolderModels
                    .find({"label": null,"child": false})
                    .then(doc =>{
                        workStreamMissionModels
                            .find({"label": null,"child": false})
                            .then(stream => {
                                let tempDate = doc
                                let allDate = tempDate.concat(stream)
                                if(allDate.length === 0){
                                    res.send({
                                        code: 1
                                    })
                                }else{
                                    res.send({
                                        code: 0,
                                        doc: allDate
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
            }else{//查询非默认标签
                workStreamFolderModels
                    .find({"label": req.body.labelInfo._id,"child": false})
                    .then(doc =>{
                        workStreamMissionModels
                            .find({"label": req.body.labelInfo._id})
                            .then(stream => {
                                let tempDate = doc
                                let allDate = tempDate.concat(stream)
                                if(allDate.length === 0){
                                    res.send({
                                        code: 1
                                    })
                                }else{
                                    res.send({
                                        code: 0,
                                        doc: allDate
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
        })
        .catch(err => {
            console.log(err)
        })
}

exports.workStream_label_findAndUpdate = (req, res, next) => {
    if(req.body.tempData.forder){
        workStreamFolderModels
            .updateOne({"_id": req.body.tempData._id},{
                "label": req.body.labelInfo._id
            })
            .then(doc => {
                if(doc.n === 1 && doc.ok === 1){
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
                    error: err
                })
            })
    }else{
        workStreamMissionModels
            .updateOne({"_id": req.body.tempData._id},{
                "label": req.body.labelInfo._id
            })
            .then(doc => {
                if(doc.n === 1 && doc.ok === 1){
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
                    error: err
                })
            })
    }
}

exports.workStream_label_editSortNum = (req, res, next) => {
    let tempNum = 0
    let successArray = []
    // async function startMapMethod(item){
    //     return new Promise(() => {
    //         workStreamLabelModels
    //             .updateOne({"_id": item._id},{
    //                 "sortNum": tempNum
    //             })
    //             .then(doc => {
    //                 console.log('doc')
    //                 console.log(doc)
    //                 console.log('doc')
    //                 if(doc.n === 1 && doc.ok === 1){
    //                     successArray.push(doc)
    //                 }
    //                 return true
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 res.send({
    //                     code: 2,
    //                     error: err
    //                 })
    //             })
    //         console.log('item')
    //     })
    // }
    // async function waitMapMethod(){
    //     console.log('######')
    //     console.log(req.body.labeArray)
    //     console.log('######')
    //     for (let item of req.body.labeArray){
    //         console.log('1')
    //         console.log(item)
    //         tempNum ++
    //         try{
    //             await startMapMethod(item)
    //         }catch(err){
    //             console.log(err)
    //         }
    //         console.log('2')
    //     }
    // }
    // waitMapMethod()
    // console.log('3')
    // if(successArray.length === tempNum){
    //     res.send({
    //         code: 0
    //     })
    // }else{
    //     res.send({
    //         code: 1
    //     })
    // }
    // console.log(successArray)
    // console.log(successArray.length)
    
    function startMapMethod(item){
        workStreamLabelModels
            .updateOne({"_id": item._id},{
                "sortNum": tempNum
            })
            .then(doc => {
                console.log('doc')
                console.log(doc)
                console.log('doc')
                if(doc.n === 1 && doc.ok === 1){
                     return successArray.push(doc)
                }
            })
            .catch(err => {
                console.log(err)
                res.send({
                    code: 2,
                    error: err
                })
            })
        console.log('item')
    }

    Promise.all()
        .then(items =>{
            console.log(items)
            items.forEach(item => {
                startMapMethod(item)
            })
            console.log('1')
        })
        .catch(err => {
            console.log(err)
        })
}
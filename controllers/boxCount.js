const boxCount = require('../models/boxCount')

//add
exports.boxCount_create_collection = (req, res, next) => {
    boxCount.create({
        date:req.body.date,
        submitter:req.body.submitter,
        countArray:[{
            date:req.body.date,
            number:req.body.number
        }]
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

//delete
exports.boxCount_delete_collection = (req, res, next) => {
    boxCount.deleteOne({_id:req.body._id,finish:false,submitter:req.body.submitter})
    .then(doc => {
        if(doc.ok === 1){
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

//edit
exports.boxCount_edit_collection = (req, res, next) => {
    boxCount.findOne({
        _id:req.body._id,
        finish:false
    })
    .then(doc => {
        if(doc){
            let tempArray = {
                date:req.body.date,
                number:req.body.number
            }
            doc.countArray = doc.countArray.concat(tempArray)
            doc.save()
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

exports.boxCount_submit_collection = (req, res, next) => {
    boxCount.updateOne({_id:req.body._id},{
        finish:true,
        finishDate:req.body.date
    })
    .then(doc => {
        if(doc.ok ===1){
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

//find
exports.boxCount_find_collection = (req, res, next) => {
    boxCount.findOne({
        submitter:req.body.submitter,
        finish:false
    })
    .then(doc => {
        if(doc){
            res.send({
                doc:doc,
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
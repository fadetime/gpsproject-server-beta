const mongoose = require('mongoose')
const Product = require('../models/dirver')



exports.dirvers_get_all = (req,res,next) => {
	Product.find()
	.then((doc) => {
		console.log(doc)
		res.send(doc)
	})
	.catch((err) => {
        console.log(err)
        res.status(500).json({
            msg:'获取数据时服务器发生错误',
            err
          })
	})
}

exports.dirvers_create_product = (req,res,next) => {
    Product.find({'dirverid':req.body.dirverid})
    .then((doc) => {
        if(doc.length != 0){
            res.send({
                code:1,
                msg:'此准证号码已存在'
            })
        }else{
            Product.find({'dirverphone':req.body.dirverphone})
            .then((item) => {
                if(item.length !=0){
                    res.send({
                        code:1,
                        msg:'此电话号已存在'
                    })
                }else{
                    Product.find({'dirverusername':req.body.dirverusername})
                    .then((user) =>{
                        if(user.length !=0){
                            res.send({
                                code:1,
                                msg:'此用户名已存在'
                            })   
                        }else{
                            Product.create(req.body)
                            .then((doc) => {
                                  console.log(doc)
                                  res.status(200).json({
                                      code:0,
                                      msg:'添加成功'
                                  })
                            })
                            .catch((err) => {
                                  console.log(err)
                                  res.send({
                                      code:2,
                                      msg:'添加时出现错误',
                                      err
                                  })
                            })
                        }
                    }).catch((err) => {
                        console.log('查找用户时发生错误')
                        console.log(err)
                        res.send({
                            code:2,
                            msg:'查找用户时发生错误',
                            err
                        })
                    })
                }
            }).catch((err) => {
                console.log('查找电话时发生错误')
                console.log(err)
                res.send({
                    code:2,
                    msg:'查找电话时发生错误',
                    err
                })
            })
    	}
    })
    .catch((err) => {
        console.log('添加人员时服务器发生错误')
        res.status(500).json({
        msg:'添加人员时服务器发生错误'
        })
		console.log(err)
	})
}

exports.dirvers_edit = (req,res,next) => {
    Product.find({_id:req.body._id})
    .then((doc) => {
        if(doc.length == 0){
            res.send({
                code:1,
                msg:'未找到此司机信息'
            })
        }else{
            Product.find({"dirverid":req.body.dirverid})
            .then((doc2) => {
                let data = doc2.filter((item) => {
                    return item._id != req.body._id
                })
                if (data.length != 0){
                    res.send({
                        code:1,
                        msg:'该准证号码已存在!'
                    })
                }else{
                    Product.find({"dirverphone":req.body.dirverphone})
                    .then((doc3) => {
                        let data2 = doc3.filter((item) => {
                            return item._id != req.body._id
                        })
                        if (data2.length !=0 ){
                            res.send({
                                code:1,
                                msg:'该电话号码已存在'
                            })
                        }else{
                            Product.find({"dirverusername":req.body.dirverusername})
                            .then((doc4) => {
                                let data3 = doc4.filter((item) => {
                                    return item._id != req.body._id
                                })
                                if(data3.length != 0){
                                    res.send({
                                        code:1,
                                        msg:'该用户名已存在'
                                    })
                                }else{
                                    Product.updateMany({_id:req.body._id},{
                                    	dirvername: req.body.dirvername,
	                                    dirverid: req.body.dirverid,
                                        dirverphone: req.body.dirverphone,
                                        dirvercard:req.body.dirvercard,
                                        dirverusername:req.body.dirvercard,
                                        dirverpsw:req.body.dirverpsw,
                                        dirvernote:req.body.dirvernote
                                    })
                                    .then(() => {
                                        res.send({
                                            code:0,
                                            msg:'修改司机信息成功'
                                        })
                                    })
                                    .catch((err) =>{
                                        res.send({
                                            code:2,
                                            msg:'修改司机信息时出现错误',
                                            err
                                        })
                                        console.log('修改司机信息时出现错误')
                                        console.log(err)
                                    })
                                }
                            })
                            .catch()
                        }
                    })
                    .catch()
                }
            })
            .catch( (err) => {
                res.send({
                    code:1,
                    msg:'查找准证号码时出错'
                })
                console.log('查找准证号码时出错')
                console.log(err)
            })

    	}
    })
    .catch((err) => {
        console.log('修改司机时服务器发生错误')
        res.status(500).json({
        msg:'修改司机时服务器发生错误'
        })
		console.log(err)
	})
}

exports.dirvers_delete = (req,res,next) => {
	Product.find({_id:req.body._id})
	.then((doc) => {
		if(doc.length == 0){
            res.send({
                code:1,
                msg:'未找到该司机'
            })
        }else{
            Product.remove({_id:req.body._id})
            .then((docc) => {
                  res.send({
                      code:0,
                      msg:'删除成功'
                  })
            })
            .catch((err) => {
                  console.log(err)
                  res.send({
                      code:2,
                      msg:'删除时出现错误',
                      err:err
                  })
            })
        }
	})
	.catch((err) => {
        console.log(err)
        res.status(500).json({
            msg:'获取数据时服务器发生错误',
            err
          })
	})
}
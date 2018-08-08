//操作客户交互方法
const mongoose = require('mongoose')
const Product = require('../models/clientb')



exports.clientbs_get_all = (req,res,next) => {
    Product.find()
    .populate('clientbserve')
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

exports.clientbs_create_product = (req,res,next) => {
    Product.find({'clientbname':req.body.clientbname})
    .then((doc) => {
        if(doc.length != 0){
            res.send({
                code:1,
                msg:'此客户名称已存在'
            })
        }else{
            Product.find({'clientbpostcode':req.body.clientbpostcode})
            .then((item) =>{
                if(item.length !=0){
                    res.send({
                        code:1,
                        msg:'此客户邮编已存在'
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
            })
    	}
    })
    .catch((err) => {
        console.log('创建客户时服务器发生错误')
        console.log(err)
        res.status(500).json({
            msg:'创建客户时服务器发生错误'
          })
	})
}

exports.clientbs_update_line = (req,res,next) => {
    if(!req.body.choiceclientb || !req.body.timesname){
        console.log('缺少修改客户线路的必要信息')
        res.send({
            code:3,
            msg:'缺少修改客户线路的必要信息'
        })
    }else{
        let choiceclientb= req.body.choiceclientb
        let timesname = req.body.timesname
        choiceclientb.forEach((item) => {
            Product.find({'_id':item})
            .then((doc) =>{
                if(doc.length==0){
                    res.send({
                        code:1,
                        msg:'未找到该客户'
                    })
                }else{
                    Product.updateMany({_id:item},{
                        clientbline:timesname
                    }).then((doc) => {
                        console.log(doc)
                        res.status(200).json({
                            code:0,
                            msg:'修改成功'
                        })
                    }).catch((err) =>{
                        console.log('修改客户线路时出现错误' + err)
                        res.send({
                            code:2,
                            msg:'修改客户线路时出现错误',
                            err
                        })
                    })
                }
            }).catch((err) => {
                console.log('查找客户线路时出现错误' + err)
            })
        });
    }
}

exports.clientbs_edit = (req,res,next) => {
	Product.find({_id:req.body._id})
	.then((doc) => {
        if(doc.length === 0){
            res.send({
                code:1,
                msg:'未找到该客户'
            })
        }else{
            Product.find({clientbname:req.body.clientbname})
            .then((doc1) =>{
                let data = doc1.filter((item) =>{
                    return item._id != req.body._id
                })
                if(data.length === 0){
                    Product.find({clientbpostcode:req.body.clientbpostcode})
                    .then((doc2) => {
                        let data1 = doc2.filter((item1) => {
                            return item1._id != req.body._id
                        })
                        if(data1.length === 0){
                            Product.update({_id:req.body._id},{
                                clientbname: req.body.clientbname,
                                clientbaddress: req.body.clientbaddress,
                                clientbphone: req.body.clientbphone,
                                clientbstatus:req.body.clientbstatus,
                                clientbpostcode:req.body.clientbpostcode,
                                clientbserve:req.body.clientbserve
                            })
                            .then(() => {
                                res.send({
                                    code:0,
                                    msg:'修改成功'
                                })
                            })
                            .catch((err) => {
                                console.log('查找客户邮编出错')
                                console.log(err)
                                res.send({
                                    code:2,
                                    msg:'查找客户邮编出错',
                                    error:err
                                })
                            })
                        }else{
                            res.send({
                                code:1,
                                msg:'客户邮编重复'
                            })
                        }
                    })
                    .catch((err) => {
                        console.log('查找客户邮编出错')
                        console.log(err)
                        res.send({
                            code:2,
                            msg:'查找客户邮编出错',
                            error:err
                        })
                    })
                }else{
                    res.send({
                        code:1,
                        msg:'客户名称重复'
                    })
                }
            })
            .catch((err) =>{
                console.log('查找客户名称出错')
                console.log(err)
                res.send({
                    code:2,
                    msg:'查找客户名称出错',
                    error:err
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

exports.clientbs_remove = (req,res,next) => {
	Product.find({_id:req.body._id})
	.then((doc) => {
		if(doc.length == 0){
            res.send({
                code:1,
                msg:'未找到该数据'
            })
        }else{
            Product.remove({_id:req.body._id})
            .then(() =>{
                res.send({
                    code:0,
                    msg:'删除成功'
                })
            })
            .catch((err) => {
                res.send({
                    code:2,
                    msg:'删除时出现错误'
                })
                console.log('删除时出现错误')
                console.log(err)
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

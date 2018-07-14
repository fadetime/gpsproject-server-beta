const mongoose = require('mongoose')
const Product = require('../models/mission')

exports.mission_get_today = (req,res,next) => {
    let startdate = new Date(req.body.startdate).getTime()
    let enddate = startdate + 86400000
    startdate = new Date(startdate).toISOString()
    enddate = new Date(enddate).toISOString()
    Product.find({"missiondate":{"$gte":startdate,"$lt":enddate}})
    //,"$lt":enddate
	.then((doc) => {
		res.send(doc)
	})
	.catch((err) => {
        console.log(err)
        res.status(500).json({
            msg:'获取数据时服务器发生错误',
            error:err
          })
	})
}

exports.mission_create = (req,res,next) => {
	Product.create(req.body)
	.then((doc) => {
		res.send({
            code:0,
            msg:'创建任务成功',
            doc:doc
        })
	})
	.catch((err) => {
        console.log(err)
        res.status(500).json({
            msg:'获取数据时服务器发生错误',
            err
          })
	})
}
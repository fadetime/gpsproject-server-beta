const express = require('express')
const router = express.Router()
const carWashController = require('../controllers/carWash')

//建立洗车记录数据
router.post('/create',carWashController.carWash_create)

//完成洗车记录数据
router.post('/edit',carWashController.carWash_edit)

//司机取消洗车
router.post('/cancel',carWashController.carWash_cancel)

//查询洗车记录数据
router.post('/find',carWashController.carWash_find)

module.exports = router
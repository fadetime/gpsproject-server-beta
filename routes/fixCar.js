const express = require('express')
const router = express.Router()
const fixCarControllers = require('../controllers/fixCar')

// 创建获取维修记录
router.get('/', fixCarControllers.fixCar_get)

// 创建汽车维修记录
router.post('/', fixCarControllers.fixCar_create)

// 修改汽车维修记录
router.post('/edit', fixCarControllers.fixCar_edit)

module.exports = router
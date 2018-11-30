const express = require('express')
const router = express.Router()
const fixCarControllers = require('../controllers/fixCar')
const uploadImage = require('../middlewares/fixCar')

// 创建获取维修记录
router.get('/', fixCarControllers.fixCar_get)

// 创建汽车维修记录
router.post('/', fixCarControllers.fixCar_create)

// 创建汽车维修记录-有照片
router.post('/photo', uploadImage.dataInput,fixCarControllers.fixCar_havePhoto_create)

// 修改汽车维修记录
router.post('/edit', fixCarControllers.fixCar_edit)

module.exports = router
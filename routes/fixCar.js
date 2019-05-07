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

// 主管车辆维修报表
router.post('/firstReport', fixCarControllers.fixCar_clientFirstReport)

// 主管损坏最多车辆信息
router.post('/maxBreak', fixCarControllers.fixCar_thisMonthMaxBreakCarReport)

// 主管查询所有未完成维修信息信息
router.post('/notReady', fixCarControllers.fixCar_notReadyRepairInfo)

// 主管查询所有未完成维修信息信息
router.post('/thisMonthInfo', fixCarControllers.fixCar_thisMonthInfo)

module.exports = router
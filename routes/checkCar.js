const express = require('express')
const router = express.Router()
const checkCarController = require('../controllers/checkCar')

//建立车辆检查数据
router.post('/',checkCarController.checkCar_create)

//获取车辆检查数据
router.post('/get',checkCarController.checkCar_get)

//获取最后一条车辆检查数据
router.post('/getlastone',checkCarController.checkCar_getLastOne)

//获取一条检查数据
router.post('/getone',checkCarController.checkCar_getOne)

//修改一条检查数据
router.post('/edit',checkCarController.checkCar_edit)

module.exports = router
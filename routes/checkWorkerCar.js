const express = require('express')
const router = express.Router()
const checkWorkerCarController = require('../controllers/checkWorkerCar')
//检查员 需检查车辆的路由

//建立车辆检查数据
router.post('/create',checkWorkerCarController.checkWorkerCar_create)

module.exports = router
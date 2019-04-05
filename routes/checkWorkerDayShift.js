const express = require('express')
const router = express.Router()
const checkWorkerDayShiftController = require('../controllers/checkWorkerDayShift')
//白班检查员 需检查车辆的路由

//new
//查询车辆检查数据
router.get('/',checkWorkerDayShiftController.checkWorker_get)

//建立车辆检查数据
router.post('/create',checkWorkerDayShiftController.checkWorker_create)

//提交车辆检查数据
router.post('/edit',checkWorkerDayShiftController.checkWorker_edit)

//车辆检查时修改车辆上次更换机油公里数
router.post('/changeOil',checkWorkerDayShiftController.checkCar_change_engineOil)

//完成本日车辆检查数据
router.post('/finish',checkWorkerDayShiftController.checkWorker_finish)

//车辆检查时查询车辆上次更换机油公里数
router.post('/findOil',checkWorkerDayShiftController.checkCar_find_engineOil)

//查询车辆检查数据-根据时间段
router.post('/find',checkWorkerDayShiftController.checkWorker_findByDate)

module.exports = router
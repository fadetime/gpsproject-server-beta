const express = require('express')
const router = express.Router()
const checkWorkerController = require('../controllers/checkWorker')
//检查员 需检查车辆的路由

//建立车辆检查数据
router.post('/create',checkWorkerController.checkWorker_create)

//提交车辆检查数据
router.post('/edit',checkWorkerController.checkWorker_edit)

//完成本日车辆检查数据
router.post('/finish',checkWorkerController.checkWorker_finish)

//查询车辆检查数据
router.get('/',checkWorkerController.checkWorker_get)

//查询车辆检查数据-根据时间段
router.post('/find',checkWorkerController.checkWorker_findByDate)

module.exports = router
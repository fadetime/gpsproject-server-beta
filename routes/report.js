const express = require('express')
const router = express.Router()
const reportController = require('../controllers/report')

// 车辆检查统计
router.post('/check', reportController.report_findByDate)

// 车辆检查统计-根据司机查询
router.post('/bydriver', reportController.report_getByDateOfdriver)

// 司机任务统计-根据司机查询
router.post('/findmission', reportController.report_getByDateOfdriverFindMission)

module.exports = router
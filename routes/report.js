const express = require('express')
const router = express.Router()
const reportController = require('../controllers/report')

// 车辆检查统计(夜班统计用)
router.post('/check', reportController.report_findByDate)

// 车辆检查统计-根据司机查询(夜班统计用)
router.post('/bydriver', reportController.report_getByDateOfdriver)

// 根据时间查找全部司机车辆检查记录
router.post('/alldriver', reportController.report_getByDateOfAllDriver)

// 司机任务统计-根据司机查询
router.post('/findmission', reportController.report_getByDateOfdriverFindMission)

// 拖欠框客户排名
router.get('/basket', reportController.report_getBasketTop)

// 根据时间查找司机车辆检查记录
router.post('/drivercheckbydate', reportController.report_getDriverCheckInfoByDate)


module.exports = router
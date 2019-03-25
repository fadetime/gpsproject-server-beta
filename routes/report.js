const express = require('express')
const router = express.Router()
const reportController = require('../controllers/report')

// 任务统计
router.post('/mission', reportController.report_findMissionByDate)

// 任务统计-基于司机统计
router.post('/missionwithdriver', reportController.report_findMissionByDateWithDriver)

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

// 查询框子流动信息
router.post('/basket', reportController.report_findBasket)

//查询区域框数信息
router.post('/areaBasket', reportController.report_findAreaBasketByDate)

//查询坏框申报审批信息
router.post('/breakBasket', reportController.report_findBreakBasketByDate)

// 查询洗车信息
router.post('/carwash', reportController.report_findCarWashByDate)

// 根据时间查找司机车辆检查记录
router.post('/drivercheckbydate', reportController.report_getDriverCheckInfoByDate)

module.exports = router
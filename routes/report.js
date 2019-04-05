const express = require('express')
const router = express.Router()
const reportController = require('../controllers/report')

// 任务统计
router.post('/mission', reportController.report_findMissionByDate)

// 任务统计-基于司机统计
router.post('/missionwithdriver', reportController.report_findMissionByDateWithDriver)

// 车辆检查统计(夜班统计用)
router.post('/check', reportController.report_findByDate)

// 车辆维修记录
router.post('/repairCar', reportController.report_repairCar_byDate)

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

//查询一天的车次框数统计
router.post('/tripByDay', reportController.report_get_byOneDay)

//修改一天的车次框数统计
router.post('/editTripByDay', reportController.report_tripCount_edit)

//查询多天的车次框数统计
router.post('/tripByMoreDay', reportController.report_get_byMoreDay)

//查询退菜任务统计
router.post('/backMission', reportController.report_backMission)

//查询退菜任务司机
router.post('/backFindDriver', reportController.report_find_backMissionDriver)

module.exports = router
const express = require('express')
const router = express.Router()
const tripCountController = require('../controllers/tripCount')
//车次菜框盘点路由

// 创建数据
router.post('/create', tripCountController.tripCount_create)

// 修改数据
router.post('/edit', tripCountController.tripCount_edit)

// 完成数据
router.post('/finish', tripCountController.tripCount_finish)

//获取数据
router.get('/', tripCountController.tripCount_get)

//获取数据1天数据(主管页面)
router.post('/oneDay', tripCountController.tripCount_getOneDayInfo)

//获取当天已提交数据(防止同一天提交多次任务)
router.post('/findOld', tripCountController.tripCount_findTodayOldMission)

module.exports = router
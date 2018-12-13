const express = require('express')
const router = express.Router()
const MissionController = require('../controllers/mission')

// 加载单条数据
router.post('/one', MissionController.mission_get_one)

// 加载任务日期
router.post('/getdate', MissionController.mission_getOne_missionDateByid)

// 加载所有数据
router.post('/', MissionController.mission_get_today)

// 修改任务时间
router.post('/editdate', MissionController.mission_editOne_missionDateByid)

// 增加任务客户
router.post('/addclient', MissionController.mission_addClient)

// 删除任务客户
router.post('/delclient', MissionController.mission_delClient)

// 增加数据
router.post('/create', MissionController.mission_create)

// 删除数据
router.post('/remove', MissionController.mission_remove)

// 司机获取数据
// router.post('/getmission', MissionController.mission_driver_get)

module.exports = router
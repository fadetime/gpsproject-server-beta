const express = require('express')
const router = express.Router()
const MissionController = require('../controllers/mission')

// 加载所有数据
router.post('/', MissionController.mission_get_today)

// 增加数据
router.post('/create', MissionController.mission_create)

// 更改数据
// router.post('/update', MissionController.mission_update)

// 删除数据
router.post('/remove', MissionController.mission_remove)

module.exports = router
const express = require('express')
const router = express.Router()
const settingController = require('../controllers/setting')

// 建立设置信息
router.get('/create', settingController.setting_create)

// 修改设置信息
router.post('/update', settingController.setting_change)

// 查找设置信息
router.get('/find', settingController.setting_find)


module.exports = router
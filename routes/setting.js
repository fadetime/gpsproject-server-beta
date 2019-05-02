const express = require('express')
const router = express.Router()
const settingController = require('../controllers/setting')

// 建立设置信息
router.get('/create', settingController.setting_create)

// 修改设置信息
router.post('/update', settingController.setting_change)

// 查找设置信息
router.get('/find', settingController.setting_find)

// 创建客服账户
router.post('/createUser', settingController.setting_createUser)

// 删除客服账户
router.post('/removeUser', settingController.setting_removeUser)

//修改客服账户
router.post('/editUser', settingController.setting_editUser)

//获取客服账户
router.post('/findUser', settingController.setting_findUser)

module.exports = router
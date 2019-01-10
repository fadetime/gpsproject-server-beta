//客服夜班任务路由
const express = require('express')
const router = express.Router()
const customerServiceController = require('../controllers/customerService')

//增加任务
router.post('/create', customerServiceController.createCSMission)

//更新任务
router.post('/update', customerServiceController.updateCSMission)

//更新任务-完成
router.post('/finish', customerServiceController.updateFinishMission)

//查找任务
router.post('/find', customerServiceController.findCSMission)

module.exports = router
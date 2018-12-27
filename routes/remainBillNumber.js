const express = require('express')
const router = express.Router()
const MissionController = require('../controllers/remainBillNumber')

// 查找剩余订单计数
router.get('/find', MissionController.remainBillNumber_find)

module.exports = router
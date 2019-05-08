const express = require('express')
const router = express.Router()
const billController = require('../controllers/bill')

// 创建账单统计
router.post('/create', billController.billCreate)

// 修改账单统计
router.post('/edit', billController.billEdit)

// 获取账单统计
router.post('/find', billController.billFind)

// 获取所有账单
router.post('/findall', billController.billFindByDate)

// 主管获取本月账单
router.post('/thisMonth', billController.bill_thisMonthInfo)

module.exports = router
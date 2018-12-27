const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

// 加载所有数据
router.post('/', adminController.admin_changePSW)

//初始化1
router.get('/init1', adminController.admin_setInitPart1)

//初始化2
router.get('/init2', adminController.admin_setInitPart2)

//初始化2
router.get('/init3', adminController.admin_setInitPart3)

module.exports = router
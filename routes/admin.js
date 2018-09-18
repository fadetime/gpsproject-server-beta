const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

// 加载所有数据
router.post('/', adminController.admin_changePSW)

module.exports = router
const express = require('express')
const router = express.Router()
const logController = require('../controllers/log')

// 加载当日数据
router.post('/', logController.log_get_today)

// 增加数据
// router.post('/', TimesController.times_create_product)


module.exports = router
const express = require('express')
const router = express.Router()
const MissionController = require('../controllers/client-company')

// 司机获取数据
router.post('/', MissionController.client_company_get)

// 司机修改密码
router.post('/change', MissionController.client_company_changepsw)


module.exports = router
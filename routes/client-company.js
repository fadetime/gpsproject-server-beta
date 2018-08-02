const express = require('express')
const router = express.Router()
const MissionController = require('../controllers/client-company')
// const uploadImage = require('../middlewares/multerUse');

// 司机获取数据
router.post('/', MissionController.client_company_get)

// 修改任务数据
// router.post('/update', MissionController.client_driver_upload)

// // 增加数据
// router.post('/create', MissionController.mission_create)

// // 删除数据
// router.post('/remove', MissionController.mission_remove)



module.exports = router
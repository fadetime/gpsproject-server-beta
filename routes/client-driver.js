const express = require('express')
const router = express.Router()
const MissionController = require('../controllers/client-driver')
const uploadImage = require('../middlewares/multerUse');

// 司机获取数据
router.post('/', MissionController.client_driver_get)

// 修改任务数据
router.post('/update', uploadImage.dataInput, MissionController.client_driver_upload)

// 完成任务
router.post('/complete', uploadImage.dataInput, MissionController.driver_missionComplete)

// 司机修改密码
router.post('/change', MissionController.client_driver_changepsw)

// 司机修改密码
router.post('/exupdate', MissionController.driver_upload_checkPic)

module.exports = router
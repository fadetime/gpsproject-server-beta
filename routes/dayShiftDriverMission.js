//操作白班任务路由
const express = require('express')
const router = express.Router()
const dayShiftDriverMissionController = require('../controllers/dayShiftDriverMission')
const uploadImage = require('../middlewares/dayShiftUse')

//增加任务
router.post('/create', dayShiftDriverMissionController.dayShiftDriver_create)

//司机删除任务中客户
router.post('/remove', dayShiftDriverMissionController.dayShiftDriver_removeClient)

//根据司机获取任务
router.post('/find', dayShiftDriverMissionController.dayShiftDriver_findByDriver)

//根据_id获取任务
router.post('/findById', dayShiftDriverMissionController.dayShiftDriver_findMissionByID)

//修改任务的车辆信息
router.post('/car', dayShiftDriverMissionController.dayShiftDriver_updateMissionByDriver)

//修改任务的检查信息
router.post('/check', dayShiftDriverMissionController.dayShiftDriver_updateCheckCar)

//完成任务中的客户
router.post('/finish', uploadImage.dataInput, dayShiftDriverMissionController.dayShiftDriver_updateClientFinishDate)

//完成任务并修改任务状态
router.post('/finishMission', dayShiftDriverMissionController.dayShiftDriver_updateFinishState)

//白班主管查询当天任务
router.post('/findByDate', dayShiftDriverMissionController.dayShiftDriver_findMissionByDay)

module.exports = router
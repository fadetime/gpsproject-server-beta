//操作白班任务路由
const express = require('express')
const router = express.Router()
const dayShiftDriverMissionController = require('../controllers/dayShiftDriverMission')
const uploadImage = require('../middlewares/dayShiftUse')

//增加任务
router.post('/create', dayShiftDriverMissionController.dayShiftDriver_create)

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

//白班主管车次功能添加客户的搜索
router.post('/search', dayShiftDriverMissionController.dayShiftDriver_searchClient)

//白班主管车次功能添加客户
router.post('/addClient', dayShiftDriverMissionController.dayShiftDriver_addClient)

//白班主管车次功能添加客户
router.post('/secondAddClient', dayShiftDriverMissionController.dayShiftDriver_secondAddClient)

//白班主管删除白班车次以及相关任务池客户
router.post('/delTrips', dayShiftDriverMissionController.dayShiftDriver_removeTrpisAndPoolClient)

//白班主管删除白班车次以内的客户
router.post('/delClientInTrips', dayShiftDriverMissionController.dayShiftDriver_removeClientInTrips)

module.exports = router
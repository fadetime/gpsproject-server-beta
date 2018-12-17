//操作白班任务路由
const express = require('express')
const router = express.Router()
const dayShiftMissionController = require('../controllers/dayShiftMission')

//增加任务
router.post('/create', dayShiftMissionController.createMission)

//白班删除任务
router.post('/remove', dayShiftMissionController.removeMission)

//白班开始任务
router.post('/start', dayShiftMissionController.startMIssion)

//白班结束任务
router.post('/end', dayShiftMissionController.endMIssion)

//查找白班任务
router.post('/find', dayShiftMissionController.findMissionByDate)

module.exports = router
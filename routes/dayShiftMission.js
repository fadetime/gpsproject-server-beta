//操作白班任务池路由
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

//查找未删除的白班任务
router.post('/findall', dayShiftMissionController.findMissionByActive)

//主管查找本月白班信息
router.post('/thisMonthInfo', dayShiftMissionController.thisMonthInfoReport)

//白班主管删除已分配的白班任务
router.post('/removeConfiguredClient', dayShiftMissionController.leaderRemoveConfirguedClient)

module.exports = router
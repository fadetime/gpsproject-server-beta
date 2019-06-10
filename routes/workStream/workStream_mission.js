const express = require('express')
const router = express.Router()
const workStreamMissionController = require('../../controllers/workStream/workStreamMission')

//create a work stream mission
router.post('/create', workStreamMissionController.workStream_mission_create)

//create a child work stream mission
router.post('/createChild', workStreamMissionController.workStream_mission_createChild)

module.exports = router
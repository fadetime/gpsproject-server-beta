const express = require('express')
const router = express.Router()
const workStreamMissionController = require('../../controllers/workStream/workStreamMission')

//create a work stream mission
router.post('/create', workStreamMissionController.workStream_mission_create)

module.exports = router
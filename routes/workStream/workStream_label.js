const express = require('express')
const router = express.Router()
const workStreamLabelController = require('../../controllers/workStream/workStreamLabel')

//create a work stream label
router.post('/create', workStreamLabelController.workStream_label_createLabel)

//create a work stream label
router.post('/find', workStreamLabelController.workStream_label_findLabel)

//find label content
router.post('/stream', workStreamLabelController.workStream_label_findLabelContent)

//find forder or file and update info
router.post('/update', workStreamLabelController.workStream_label_findAndUpdate)

//find label and update sort number
router.post('/sort', workStreamLabelController.workStream_label_editSortNum)

module.exports = router
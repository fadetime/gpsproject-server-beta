const express = require('express')
const router = express.Router()
const workStreamLabelController = require('../../controllers/workStream/workStreamLabel')

//create a work stream label
router.post('/create', workStreamLabelController.workStream_label_createLabel)

//create a work stream label
router.post('/find', workStreamLabelController.workStream_label_findLabel)

module.exports = router
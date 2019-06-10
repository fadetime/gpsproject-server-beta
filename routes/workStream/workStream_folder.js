const express = require('express')
const router = express.Router()
const workStreamFolderController = require('../../controllers/workStream/workStreamFolder')

//create a work stream folder
router.post('/create', workStreamFolderController.workStream_folder_create)

//find a work stream folder
router.post('/findFolder', workStreamFolderController.workStream_folder_find)

//create a work stream child folder
router.post('/createChildFolder', workStreamFolderController.workStream_folder_createChild)

module.exports = router
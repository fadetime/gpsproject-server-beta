const express = require('express')
const router = express.Router()
const checkCarController = require('../controllers/checkCar')

router.post('/',checkCarController.checkCar_create)
router.post('/get',checkCarController.checkCar_get)

module.exports = router
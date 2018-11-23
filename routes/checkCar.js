const express = require('express')
const router = express.Router()
const checkCarController = require('../controllers/checkCar')

router.post('/',checkCarController.checkCar_create)
router.post('/get',checkCarController.checkCar_get)
router.post('/edit',checkCarController.checkCar_edit)

module.exports = router
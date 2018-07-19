const express = require('express')
const router = express.Router()
const ClerkController = require('../controllers/clerks')

router.post('/',ClerkController.login)

module.exports = router
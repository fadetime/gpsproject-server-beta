const express = require('express')
const router = express.Router()
const ClerkController = require('../controllers/clerks')

router.post('/',ClerkController.login)
router.post('/create',ClerkController.operator_create)
router.post('/userlogin',ClerkController.user_login)
router.post('/companylogin',ClerkController.company_login)

module.exports = router
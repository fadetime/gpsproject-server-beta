const express = require('express')
const router = express.Router()
const MyBasketCtrl = require('../controllers/basket')

//添加区域
router.post('/create', MyBasketCtrl.basket_create)

module.exports = router
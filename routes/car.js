const express = require('express')
const router = express.Router()
const CarController = require('../controllers/car')

// 加载所有数据
router.get('/', CarController.carts_get_all)

// 分页加载所有数据
router.post('/get', CarController.carts_post_all)

// 查找数据
router.post('/find', CarController.carts_find)

// 增加数据
router.post('/', CarController.carts_create_product)

// 更改数据
router.post('/update', CarController.carts_update)

// 删除数据
router.post('/remove', CarController.carts_remove)

module.exports = router
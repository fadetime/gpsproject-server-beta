const express = require('express')
const router = express.Router()
const TimesController = require('../controllers/times')

// 加载所有数据
router.get('/', TimesController.times_get_all)

// 分页加载所有数据
router.post('/get', TimesController.times_post_all)

// 查找数据
router.post('/find', TimesController.times_find)

// 增加数据
router.post('/', TimesController.times_create_product)

// 修改数据
router.post('/edit', TimesController.times_eidt)

// 删除数据
router.post('/remove', TimesController.times_remove)

// 线路排序
router.post('/sort', TimesController.times_sort)

module.exports = router
const express = require('express')
const router = express.Router()
const DirverController = require('../controllers/dirver')

// 加载所有数据
router.get('/', DirverController.dirvers_get_all)

// 分页加载所有数据
router.post('/get', DirverController.dirvers_post_all)

// 查找数据
router.post('/find', DirverController.driver_find)

// 增加数据
router.post('/', DirverController.dirvers_create_product)

// 修改数据
router.post('/edit', DirverController.dirvers_edit)

// 删除数据
router.post('/remove', DirverController.dirvers_delete)

module.exports = router
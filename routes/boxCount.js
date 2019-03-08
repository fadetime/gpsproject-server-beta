//框数统计路由
const express = require('express')
const router = express.Router()
const boxCountController = require('../controllers/boxCount')

// 用户创建框数统计
router.post('/create', boxCountController.boxCount_create_collection)

// 用户删除框数统计
router.post('/remove', boxCountController.boxCount_delete_collection)

// 用户添加统计表
router.post('/edit', boxCountController.boxCount_edit_collection)

// 用户完结报表
router.post('/submit', boxCountController.boxCount_submit_collection)

// 用户查询统计表
router.post('/find', boxCountController.boxCount_find_collection)

module.exports = router
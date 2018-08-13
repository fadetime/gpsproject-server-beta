//操作合作商路由
const express = require('express')
const router = express.Router()
const ClientAController = require('../controllers/clienta')

// 加载所有数据
router.get('/', ClientAController.clientas_get)

// 分页加载所有数据
router.post('/get', ClientAController.clientas_get_all)

// 查找数据
router.post('/find', ClientAController.clientA_find)

// 增加数据
router.post('/', ClientAController.clientas_create_product)

// 修改数据
router.post('/edit', ClientAController.clientas_edit)

// 删除数据
router.post('/remove', ClientAController.clientas_remove)

// 联级删除
// router.post('/test', ClientAController.clientas_remove_clientB)

module.exports = router
const express = require('express')
const router = express.Router()
const AreaController = require('../controllers/area')

// 加载所有数据
router.get('/', AreaController.area_get_all)

//添加区域
router.post('/post', AreaController.area_create)

//修改区域
router.post('/update', AreaController.area_update)

//删除区域
router.post('/remove', AreaController.area_remove)

module.exports = router
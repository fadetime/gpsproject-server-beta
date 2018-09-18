//操作客户路由
const express = require('express')
const router = express.Router()
const ClientBController = require('../controllers/clientb')
const uploadImage = require('../middlewares/clientImgUse');

// 加载所有数据
router.get('/', ClientBController.clientbs_get)

// 分页加载所有数据
router.post('/get', ClientBController.clientbs_get_all)

// 查找数据
router.post('/find', ClientBController.clientbs_find)

// 增加数据
router.post('/', uploadImage.dataInput, ClientBController.clientbs_create_product)

// 增改照片
router.post('/update/img', uploadImage.dataInput, ClientBController.clientbs_edit_img)

// 修改数据
router.post('/edit', ClientBController.clientbs_edit)

// 删除数据
router.post('/remove', ClientBController.clientbs_remove)

// 修改客户线路
router.post('/changeline', ClientBController.clientbs_update_line)

module.exports = router
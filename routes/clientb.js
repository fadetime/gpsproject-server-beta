//操作客户路由
const express = require('express')
const router = express.Router()
const ClientBController = require('../controllers/clientb')
const uploadImage = require('../middlewares/clientImgUse')

//加载未来单客户
router.get('/noOrder', ClientBController.clientbs_getNoOrderDay)

// 加载所有数据
router.get('/', ClientBController.clientbs_get)

// 分页加载所有数据
router.post('/get', ClientBController.clientbs_get_all)

// 加载所有活动数据
router.post('/active', ClientBController.clientbs_get_active)

// 分页加载活动数据
router.post('/page', ClientBController.clientbs_active_Apage)

//分页加载过滤后的活动数据
router.post('/filterpage', ClientBController.clientbs_active_filter_Apage)

// 查找数据
router.post('/find', ClientBController.clientbs_find)

// 白班主管查询数据
router.post('/dayFind', ClientBController.clientbs_findForDayShift)

// 增加数据
router.post('/', uploadImage.dataInput, ClientBController.clientbs_create_product)

// 增改照片
router.post('/update/img', uploadImage.dataInput, ClientBController.clientbs_edit_img)

// 修改数据
router.post('/edit', ClientBController.clientbs_edit)


// 修改数据
router.post('/666edit', ClientBController.clientbs_other_edit)

// 删除数据
router.post('/remove', ClientBController.clientbs_remove)

// 修改客户线路
router.post('/changeline', ClientBController.clientbs_update_line)

// 修改客户必传照片
router.post('/needpic', ClientBController.client_change_needpic)

// 修改客户拖欠框数
router.post('/basket', ClientBController.client_change_basketNum)

module.exports = router
const express = require('express')
const router = express.Router()
const DirverController = require('../controllers/dirver')
const uploadImage = require('../middlewares/multerUse');

// 加载所有数据
router.get('/', DirverController.dirvers_get_all)

// 获取员工中英文姓名
router.post('/name', DirverController.staff_nameCh_nameEn)

// 分页加载所有数据
router.post('/get', DirverController.dirvers_post_all)

// 查找数据
router.post('/find', DirverController.driver_find)

// 增加数据
router.post('/', uploadImage.dataInput, DirverController.dirvers_create_product)

// 修改数据
router.post('/edit', uploadImage.dataInput, DirverController.dirvers_edit)

// 修改照片
router.post('/edit/img', uploadImage.dataInput, DirverController.dirver_img_edit)

// 删除数据
router.post('/remove', DirverController.dirvers_delete)

// 司机查找车辆机油报警
router.post('/findOilWarning', DirverController.staff_find_carOilWarning)
module.exports = router
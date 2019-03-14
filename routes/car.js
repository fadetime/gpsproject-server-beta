const express = require('express')
const router = express.Router()
const CarController = require('../controllers/car')
const uploadImage = require('../middlewares/multerUse');

// 加载所有数据
router.get('/', CarController.carts_get_all)

// 加载所有车牌
router.get('/allplate', CarController.carts_get_allPlate)

// 分页加载所有数据
router.post('/get', CarController.carts_post_all)

// 查找数据
router.post('/find', CarController.carts_find)

// 增加数据
router.post('/', uploadImage.dataInput, CarController.carts_create_product)

// 更改数据
router.post('/update', CarController.carts_update)

// 更改照片
router.post('/update/img', uploadImage.dataInput, CarController.carts_update_img)

// 删除数据
router.post('/remove', CarController.carts_remove)

//--机油监控部分--

// 维修员查看车辆信息
router.get('/manFindCar', CarController.manFindAllCar)

// 维修员修改机油信息
router.post('/manChangeOil', CarController.manFindChangeOil)

module.exports = router
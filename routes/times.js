const express = require('express')
const router = express.Router()
const TimesController = require('../controllers/times')

// 加载单个数据
router.post('/one', TimesController.times_get_one)

// 加载所有数据
router.get('/', TimesController.times_get_all)

// 获取所有线路名
router.get('/name', TimesController.times_getName)

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

// 客户排序-客服次序
router.post('/clientsort', TimesController.usedDriver_editClientSort)

// 客户排序-司机次序
router.post('/driversort', TimesController.usedDriver_editDriverSort)

// 增加常用司机
router.post('/useddriveradd', TimesController.usedDriver_add)

// 删除常用司机
router.post('/useddriverdel', TimesController.usedDriver_remove)

// 高级搜索-搜索提示
router.post('/find-tips', TimesController.advanced_find_title)

// 高级搜索-搜索结果
router.post('/finda', TimesController.advanced_find_clientAndLine)

// 报表-获取车辆司机数据
router.get('/DC', TimesController.trips_get_DCInfo_forReport)

// 车次转移客户
router.post('/changeTrips', TimesController.trips_changeClientWithOtherTrips)

module.exports = router
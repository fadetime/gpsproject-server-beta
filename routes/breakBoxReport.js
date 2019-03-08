//坏框申请路由
const express = require('express')
const router = express.Router()
const breakBoxReportController = require('../controllers/breakBoxReport')
const uploadImage = require('../middlewares/breakBoxReportUse')

// 用户创建申请
router.post('/create', uploadImage.dataInput,breakBoxReportController.breakBoxReport_create)

// 根据用户查找申请
router.post('/findforuser', breakBoxReportController.breakBoxReport_findForUser)

// 查找未审批申请
router.post('/findnew', breakBoxReportController.breakBoxReport_findNew)

// 审批申请
router.post('/approval', breakBoxReportController.breakBoxReport_approval)

// 查找已审批申请
router.post('/findold', breakBoxReportController.breakBoxReport_old_10item)

//用户删除未审批申请
router.post('/del', breakBoxReportController.breakBoxReport_delWithUser)
module.exports = router
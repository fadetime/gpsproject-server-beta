//白班任务模板路由
const express = require('express')
const router = express.Router()
const dayShiftTemplateController = require('../controllers/dayShiftTemplate')

//增加任务
router.post('/create', dayShiftTemplateController.createTemplate)

//建立白班任务
router.post('/createMission', dayShiftTemplateController.templateCreateMission)

//删除任务
router.post('/del', dayShiftTemplateController.delTemplate)

//查找任务
router.post('/find', dayShiftTemplateController.findTemplate)

//查找所有模板信息
router.post('/findAll', dayShiftTemplateController.findAllTemplate)

//更新模板信息
router.post('/updateClient', dayShiftTemplateController.updateTemplate)

//修改任务类型
router.post('/changeMissionType', dayShiftTemplateController.changeMissionType)

//修改模板匹配
router.post('/changeMatch', dayShiftTemplateController.changeMatch)

//匹配14车次
router.post('/Match14', dayShiftTemplateController.getMatchInfo_match14)

//匹配19车次
router.post('/Match19', dayShiftTemplateController.getMatchInfo_match19)

//修改模板名
router.post('/changeName', dayShiftTemplateController.template_changeName)

module.exports = router
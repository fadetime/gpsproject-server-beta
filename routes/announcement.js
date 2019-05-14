const express = require('express')
const router = express.Router()
const announcementController = require('../controllers/announcement')
const uploadImage = require('../middlewares/firstPageNoticeUse');

// 新建或修改首页公告中文
router.post('/edit',uploadImage.dataInput ,announcementController.notice_update)

// 新建或修改首页公告英文
router.post('/editEN',uploadImage.dataInput ,announcementController.notice_updateEN)

// 控制台查找首页公告
router.post('/panelfind', announcementController.notice_Find)

// 用户查找首页公告
router.get('/find', announcementController.client_Find)

// 控制台查找首页公告记录
router.get('/findFirstPageLog', announcementController.notice_firstPage_Find10)

module.exports = router
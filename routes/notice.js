const express = require('express')
const router = express.Router()
const NoticeController = require('../controllers/notice')

// 增加数据
router.post('/create', NoticeController.notice_create)

// 控制台获取数据
router.post('/panelget', NoticeController.notice_panel_get)

// 客户端获取未读公告
router.post('/clientget', NoticeController.notice_client_get)

// 客户端获取所有公告
router.post('/clientall', NoticeController.notice_client_get_all)

// 客户端阅读公告记录
router.post('/read', NoticeController.notice_user_read)

module.exports = router
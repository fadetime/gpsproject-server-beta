const mongoose = require('mongoose')

//通知公告模型
const noticeSchema = mongoose.Schema({
    date: { type: Date, required: true },//生成时间
    title: { type: String, required: true },//公告标题
    content: { type: String, required: true },//公告内容
    allStaff: [{ type: String }],//包含人员
    leftStaff: [{ type: String }],//未读人员
    isFinish: { type: Boolean, default: false },//通知完成
})

module.exports = mongoose.model('notices', noticeSchema)
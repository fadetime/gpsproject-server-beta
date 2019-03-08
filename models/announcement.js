const mongoose = require('mongoose')

//首页通知模型
const announcementSchema = mongoose.Schema({
    date: { type: Date, required: true },//生成时间
    image: { type: String, default: null },//提交的照片
    text: { type: String, default: null },//提交的文字
    isShow: { type: Boolean, default: false }//是否展示
})

module.exports = mongoose.model('announcements', announcementSchema)
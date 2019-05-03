const mongoose = require('mongoose')

//首页通知模型
const firstPageNotice = mongoose.Schema({
    date: { type: Date, required: true },//修改时间
    image: { type: String, default: null },//修改的照片
    text: { type: String, default: null },//修改的文字-中文
    textEN: { type: String, default: null }//修改的文字-英文
})

module.exports = mongoose.model('firstPageNotices', firstPageNotice)
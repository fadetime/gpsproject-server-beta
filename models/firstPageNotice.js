const mongoose = require('mongoose')

//首页通知日志模型
const firstPageNotice = mongoose.Schema({
    date: { type: Date, required: true },//修改时间
    image: { type: String, default: null },//修改的照片
    text: { type: String, default: null },//修改的文字
})

module.exports = mongoose.model('firstPageNotices', firstPageNotice)
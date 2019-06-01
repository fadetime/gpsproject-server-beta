const mongoose = require('mongoose')

//首页通知模型
const workStreamLabelSchema = mongoose.Schema({
    date: { type: Date, required: true },//生成时间
    name: { type: String, default: null },//标签名
})

module.exports = mongoose.model('workstreamlabels', workStreamLabelSchema)
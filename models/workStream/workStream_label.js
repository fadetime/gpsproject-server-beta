const mongoose = require('mongoose')

//标签模型
const workStreamLabelSchema = mongoose.Schema({
    date: { type: Date, required: true },//生成时间
    name: { type: String, default: null },//标签名
    isSpecial: { type: Boolean, default: false},//特别标签，是否不可删除
    sortNum: { type: Number , default: 999}//排序号码
})

module.exports = mongoose.model('workstreamlabels', workStreamLabelSchema)
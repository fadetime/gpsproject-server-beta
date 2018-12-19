const mongoose = require('mongoose')

//送单统计模型
const billSchema = mongoose.Schema({
    date: { type: String, required: true },//生成时间
    startNum: { type: Number, required: true },//接受账单数量
    endNum: { type: Number, default: null },//带回账单数量
    endDate: { type: Date, default: null },//带回时间
    driverName: { type: String, required: true },//操作司机,接受司机
    driverNames: { type: String, default: null },//操作司机,带回司机
    hasReomved: { type: Boolean, default: false },//是否已删除
    removeReason: { type: String }//操作司机删除原因
})

module.exports = mongoose.model('bills', billSchema)
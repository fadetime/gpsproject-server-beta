//定义短信提醒数据模型
const mongoose = require('mongoose')

const openSMSSchema = mongoose.Schema({
    orderDate: { type: Date, default: Date.now },//创建时间
    clientId: { type: String, required: true },//客户唯一标识
    clientName: { type: String },//客户名称
    startDate: { type: Date, required: true },//通知开始时间
    endDate: { type: Date, required: true },//通知结束时间
    orderCount: { type: Number, default: 0 },//订单计数
})

module.exports = mongoose.model('openSMS', openSMSSchema)
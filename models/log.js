//定义log数据模型
const mongoose = require('mongoose')

const logchema = mongoose.Schema({
    logDate: { type: Date, default: Date.now },//创建时间
    logOperator: { type: String },//操作人
    logPlace: { type: String },//操作模块
    logMode: { type: String, required: true },//操作方式
    logInfo: { type: String },//操作内容
})

module.exports = mongoose.model('log', logchema)
//定义log数据模型
const mongoose = require('mongoose')

const logchema = mongoose.Schema({
    logDate: { type: Date, default: new Date() },//创建时间
    logPlace: {type:String},//操作模块
    logMode: { type: String, required: true },//操作方式
    logInfo: { type: String },//操作内容
})

module.exports = mongoose.model('log', logchema)
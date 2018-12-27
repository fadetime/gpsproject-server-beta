const mongoose = require('mongoose')

//送单统计模型
const basketSchema = mongoose.Schema({
    date: { type: String, required: true },//生成时间
    lineName: { type: String, required: true },//线路名称
    driverName: { type: String, required: true },//生成司机
    clientName: { type: String, required: true },//客户名称
    outBasket: { type: Number, required: true },//拿给客户的框数
    inBasket: { type: Number, required: true },//拿回的框数
})

module.exports = mongoose.model('baskets', basketSchema)
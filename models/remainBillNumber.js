//定义剩余订单数统计模型
const mongoose = require('mongoose')

const remainBillNumberchema = mongoose.Schema({
    editDate: { type: Date, default: Date.now },//修改时间
    number: { type: Number,  default: 0},//剩余订单数量
})

module.exports = mongoose.model('remainBillNumbers', remainBillNumberchema)
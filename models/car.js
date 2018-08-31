const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    carid: { type: String, required: true },//车牌号码
    cartype: { type: String },//车型信息
    tailgate: { type: String },//是否含有尾门
    coolstore:{ type:String },//时候含有冷柜
    cardate: { type: Date, default: Date.now() },//加入时间
    cartimes: { type: Number, default: 0 },//出车次数
    carnote: { type: String },//出车备注
    image: { type: String, default: null },//车辆照片
})

module.exports = mongoose.model('Car', carSchema)
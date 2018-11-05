const mongoose = require('mongoose')

const checkCarSchema = mongoose.Schema({
    car_id: { type: String, required: true },//车辆标识
    driver: { type:String, required: true },//司机
    date: { type: Date, default: new Date() },//生成时间
    wiper: { type: Boolean, default: false },//雨刷
    headlight: { type: Boolean, default: false },//大灯
    mirror: { type: Boolean, default: false },//后视镜
    tyre: { type: Boolean, default: false },//车胎
    backup: { type: Boolean, default: false },//备用车胎
    brake: { type: Boolean, default: false },//刹车

})

module.exports = mongoose.model('checkCars', checkCarSchema)
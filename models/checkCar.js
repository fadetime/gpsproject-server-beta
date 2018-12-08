const mongoose = require('mongoose')

const checkCarSchema = mongoose.Schema({
    car_id: { type: String, required: true },//车辆标识
    driver: { type: String, required: true },//司机
    date: { type: Date, default: Date.now },//生成时间
    finishDate: { type: Date, default: null },//收车时间
    wiper: { type: Boolean, default: false },//雨刷
    headlight: { type: Boolean, default: false },//大灯
    mirror: { type: Boolean, default: false },//后视镜
    tyre: { type: Boolean, default: false },//车胎
    backup: { type: Boolean, default: false },//备用车胎
    brake: { type: Boolean, default: false },//刹车
    petrolCard: { type: Boolean, default: false },//油卡
    text: { type: String, default: null }, //其他
    boxNum: { type: Number }, //框数量
    clean: { type: Boolean, default: false },//干净
    boxNumAgain: { type: Number, default: null },//送货后框数
    finish: { type: Boolean, default: true } //检查无异常
})

module.exports = mongoose.model('checkCars', checkCarSchema)
const mongoose = require('mongoose')

const checkWorkerCarSchema = mongoose.Schema({
    carPlate: { type: String, required: true },//车牌
    headlight: { type: Boolean, default: true },//大灯
    brakeLight: { type: Boolean, default: true },//刹车灯
    tyre: { type: Boolean, default: true },//车胎
    petrolCard: { type: Boolean, default: true },//油卡
    note: { type: String, default: null },//备注
    date: { type: Date, default: Date.now } //建立或修改的时间
})

module.exports = mongoose.model('CheckWorkerCar', checkWorkerCarSchema);
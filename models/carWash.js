const mongoose = require('mongoose')

const carWashSchema = mongoose.Schema({
    carPlate: { type: String, default: null },//车牌
    car_id: { type: String, default: null },//车辆_id
    creator: { type: String, required: true },//生成人员
    createDate: { type: Date, required: true },//生成时间
    finishDate: { type: Date, default: null },//结束时间
    isRemoved: { type: Boolean, default: false },//已被删除
    removeReason: { type: String, default: null }//删除原因
})

module.exports = mongoose.model('carWashs', carWashSchema)
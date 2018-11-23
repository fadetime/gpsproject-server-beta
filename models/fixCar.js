const mongoose = require('mongoose')

const fixCarSchema = mongoose.Schema({
    car_id: { type:mongoose.Schema.Types.ObjectId,ref:'Car', required: true },//车辆_id
    driver: { type: String, require: true },//记录生成人
    logStartTime: { type: Date, default: new Date() },//记录生成时间
    logEndTime: { type: Date },//维修完成时间
    worker: { type: String, default: null },//维修人
    //状态码 0 正常，1 需要维修，2 维修完成，3 保留
    wiper: { type: Number, default: 0 },//雨刷
    headlight: { type: Number, default: 0 },//大灯
    mirror: { type: Number, default: 0 },//倒车镜
    tyre: { type: Number, default: 0 },//车胎
    backup: { type: Number, default: 0 },//备胎
    brake: { type: Number, default: 0 },//刹车
    other: { type: Number, default: 0 },//其他
    note: { type: String },//备注
    finish: { type: Boolean, default: false },//记录是否完成维修
})

module.exports = mongoose.model('fixCarLogs', fixCarSchema)
//定义车次数据模型
const mongoose = require('mongoose')

const timesSchema = mongoose.Schema({
    timesname: { type: String, required: true },//线路名称
    timesstatus: { type: String },//线路状态
    goTime: { type: String, default: null },//固定发车时间
    backTime: { type: String, default: null },//固定收车时间
    timescar: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },//车牌号
    timesdirver: { type: mongoose.Schema.Types.ObjectId, ref: 'Dirver' },//线路司机
    timesstart: { type: String },//出车时间
    timesend: { type: String },//抵达时间
    timesclienta: { type: String },//包含服务商
    timesclientb: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClientB' }],//包含客户
    timesclientnumber: { type: Number },//客户总数
    timesclientfinsh: { type: Number },//完成总数
    timesnote: { type: String },//线路备注
    timescount: { type: Number, default: 0 },//线路出车次数
    lineIndexNumber: { type: Number, default: 999 },//线路排序序号
    NcNumber: { type: Number, default: 0 },//对应新后台车次
    usedDriver: [
        { type: String } //常用司机
    ],
})

module.exports = mongoose.model('Times', timesSchema)
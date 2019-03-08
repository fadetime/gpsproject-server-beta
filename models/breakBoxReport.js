const mongoose = require('mongoose')

//送单统计模型
const breakBoxPoolSchema = mongoose.Schema({
    date: { type: Date, required: true },//生成时间
    basketNum: { type: Number, required: true },//提交坏框数量
    note: { type: String },//提交的备注
    image: { type: String, default: null },//提交的照片
    submitter: { type: String, required: true },//提交人
    submitter_id: { type: String, required: true },//提交人id
    approver: { type: String, default: null },//审批人
    approver_id: { type: String, default: null },//审批人id
    finishDate: { type: Date, default: null },//审批时间
    confirm: {type:String , default:null}//审批是否通过
})

module.exports = mongoose.model('breakBoxPools', breakBoxPoolSchema)
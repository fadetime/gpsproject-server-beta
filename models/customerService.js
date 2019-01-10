//定义客服任务池模型
const mongoose = require('mongoose')

const customerServiceSchema = mongoose.Schema({
    clientName: { type: String, required: true },//客户名称
    note: { type: String, required: true },//备注
    driverNote: { type: String, default: null },//司机备注
    createDate: { type: Date, default: Date.now },//创建日期
    isFinish: { type: Boolean, default: false },//是已经发放到物流任务
    mission_id: { type: String, default: null },//任务_id
    isReturnDone: { type: String, default: null },//退菜是否成功
    finishiDate: { type: Date, default: null }//司机退菜完成时间
})

module.exports = mongoose.model('csnights', customerServiceSchema)
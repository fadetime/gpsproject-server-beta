//定义白班任务
const mongoose = require('mongoose')

const dayShiftMissionSchema = mongoose.Schema({
    client_id: { type: String, required: true },//客户_id
    clientName: { type: String, required: true },//客户名称
    clientNameEN: { type: String },//英文名称
    note: { type: String, default: null },//备注
    clientAddress: { type: String },//客户地址
    clientPhone: { type: String },//客户电话
    clientPostcode: { type: String },//客户邮编
    image: { type: String, default: null },//客户图片
    goTime: { type: String },//出车时间
    backTime: { type: String },//收车时间
    isIncreaseOrder: { type: Boolean, default: true },//是否为加单，true 加单 false 补单
    driverName: { type: String, required: true },//任务司机名
    orderDate: { type: Date, required: true },//订单生成日期
    isRemoved: { type: Boolean, default: false },//已经删除
    removeReason: { type: String }//删除原因
})

module.exports = mongoose.model('dayShiftMissions', dayShiftMissionSchema)
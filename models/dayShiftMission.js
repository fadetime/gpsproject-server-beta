//定义白班任务池
const mongoose = require('mongoose')

const dayShiftMissionSchema = mongoose.Schema({
    client_id: { type: String, required: true },//客户_id
    dayMission_id: {type: String,default: null},//白班司机任务id
    clientName: { type: String, required: true },//客户名称
    clientNameEN: { type: String },//英文名称
    note: { type: String, default: null },//备注
    clientAddress: { type: String },//客户地址
    clientPhone: { type: String },//客户电话
    clientPostcode: { type: String },//客户邮编
    image: { type: String, default: null },//客户图片
    isIncreaseOrder: { type: String, default:null },//是否为加单，true 加单 false 补单 return
    driverName: { type: String, default:null },//任务司机名
    orderDate: { type: Date, required: true },//订单生成日期
    isRemoved: { type: Boolean, default: false },//已经删除
    removeReason: { type: String },//删除原因
    isFinish: { type: Boolean, default: false },//是否完成
    finishDate: { type: Date, default: null },//完成时间
    pool_id: { type: String, default: null }//任务池_id
})

module.exports = mongoose.model('dayShiftMissions', dayShiftMissionSchema)
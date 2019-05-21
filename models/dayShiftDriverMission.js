//定义白班司机任务
const mongoose = require('mongoose')

const dayShiftDriverMissionSchema = mongoose.Schema({
    driverName: { type: String, default: null },//任务司机名
    orderDate: { type: Date, required: true },//订单生成日期
    Car_id: { type: String, default: null},//车辆_id
    carPlate:{ type: String, default: null},//车牌号码
    carCheck_id: { type: String },//检查记录id
    goTime: { type: Date, default: null },//出车时间
    backTime: { type: Date, default: null },//收车时间
    missionFinish: { type:Boolean, default: false },//任务完成标识符
    clientArray: [{
        client_id: { type: String, default: null },//客户_id
        clientName: { type: String, required: true },//客户名称
        clientNameEN: { type: String },//英文名称
        note: { type: String, default: null },//备注
        clientAddress: { type: String },//客户地址
        clientPhone: { type: String },//客户电话
        clientPostcode: { type: String },//客户邮编
        image: { type: String, default: null },//客户图片
        isIncreaseOrder: { type: String, default: null },//是否为加单，true 加单 false 补单 return 运输 delivery 其他 other
        finisDate: {type: Date, default: null },//完成时间
        pool_id: { type: String, default: null }//任务池_id
    }]
})

module.exports = mongoose.model('dayShiftDriverMissions', dayShiftDriverMissionSchema)
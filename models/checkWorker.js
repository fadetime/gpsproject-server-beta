const mongoose = require('mongoose')

const checkWorkerSchema = mongoose.Schema({
    createDate: { type: Date, required: true },//任务创建时间
    missionCreator: { type: String, required: true },//任务创建人
    creator_id: { type: String, required: true },//创建人_id
    missionList: [{
        carPlate: { type: String },
        cart: { type: Boolean },//手推车
        drivingRecorder: { type: Boolean },//行车记录仪
        carWindow: { type: Boolean },//车窗
        taillight: { type: Boolean },//尾灯
        sideMirror: { type: Boolean },//后视镜
        headlight: { type: Boolean },
        brakeLight: { type: Boolean },
        tyre: { type: Boolean },
        petrolCard: { type: Boolean },
        kilometer: { type: Number },
        note: { type: String },
        checkDate: { type: Date, default: null },//提交检查时间
        isFinish: { type: Boolean, default: false }
    }],//需要检查的车辆
    finishDate: { type: Date, default: null }, //任务完成时间
})

module.exports = mongoose.model('CheckWorker', checkWorkerSchema);
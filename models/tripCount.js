//定义车次菜框盘点模型
const mongoose = require('mongoose')

const tripCountSchema = mongoose.Schema({
    creater: { type: String, required: true },//创建人
    creater_id: { type: String, required: true },//创建人_id
    createDate: { type: Date, required: true },//创建时间
    missionDate: { type: Date, required: true },//任务时间
    missionArray: [{
        carNo: { type: String, default: null },
        driver_id: { type: String, default: null },
        driverNameCh: { type: String, default: null },
        driverNameEn: { type: String, default: null },
        out: { type: Number, default: null },
        outKm: { type: Number, default: null },
        in: { type: Number, default: null },
        inKm: { type: Number, default: null },
        lastEditDate: { type: Date, default: null }
    }],
    finishDate: { type: Date, default: null },//完成时间
    finish: { type: Boolean, default: false }//是否已完成
})

module.exports = mongoose.model('tripCounts', tripCountSchema)
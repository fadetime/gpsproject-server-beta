//定义环境数据模型
const mongoose = require('mongoose')

const settingSchema = mongoose.Schema({
    engineOilValve: { type: Number, default:100 },//车辆检查-车辆维修，通知更换机油的临界值
    oilProperty:{ type: Number, default:5000 }//添加新机油后可运行的公里数
})

module.exports = mongoose.model('settings', settingSchema)
const mongoose = require('mongoose')

//工作流-任务模型
const workStreamMissionSchema = mongoose.Schema({
    date: { type: Date, required: true },//生成时间
    name: { type: String, default: null },//标签名
})

module.exports = mongoose.model('workstreammissions', workStreamMissionSchema)
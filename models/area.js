const mongoose = require('mongoose')

const areaSchema = mongoose.Schema({
    areaName: { type: String, required: true },//区域名称
    areaDescription: { type: String },//区域描述
    invisible: { type: Boolean, default: false } //隐藏
})

module.exports = mongoose.model('areas', areaSchema)
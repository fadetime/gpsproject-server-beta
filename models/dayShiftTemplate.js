//白班任务模板模型
const mongoose = require('mongoose')

const dayShiftTemplateSchema = mongoose.Schema({
    templateName: { type: String, required: true },//模板名称
    createDate: {type: Date, default: Date.now()},//创建时间
    creater: { type: String, required: true },//创建人
    clientArray: [
        {
            client_id: { type: String, required: true },//客户_id
            clientName: { type: String, required: true },//客户名称
            clientNameEN: { type: String },//英文名称
            clientAddress: { type: String },//客户地址
            clientPhone: { type: String },//客户电话
            clientPostcode: { type: String },//客户邮编
        }
    ]
})

module.exports = mongoose.model('dayShiftTemplates', dayShiftTemplateSchema)
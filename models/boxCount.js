const mongoose = require('mongoose')

//框子统计表
const boxCountSchema = mongoose.Schema({
    date: { type: Date, required: true },//生成时间
    submitter: { type: String, required: true },//提交人

    area1date:  { type: Date, default: null },//提交时间
    area1number: { type: Number, default: null },//数量 --DT area
    area1image: { type: String, default: null },//上传的照片

    area2date:  { type: Date, default: null },//提交时间
    area2number: { type: Number, default: null },//数量 --cold
    area2image: { type: String, default: null },//上传的照片

    area3date:  { type: Date, default: null },//提交时间
    area3number: { type: Number, default: null },//数量 --配单
    area3image: { type: String, default: null },//上传的照片
    
    finish: { type: Boolean, default: false },//本次统计是否完结
    finishDate: { type: Date, default: null }//完结时间
})

module.exports = mongoose.model('boxCount', boxCountSchema)
const mongoose = require('mongoose')

//框子统计表
const boxCountSchema = mongoose.Schema({
    date: { type: Date, required: true },//生成时间
    submitter: { type: String, required: true },//提交人
    countArray: [{
        date:{ type: Date, required: true},//提交时间
        number:{ type: Number, required: true}//数量
    }],
    finish:{ type: Boolean , default: false},//本次统计是否完结
    finishDate:{ type: Date , default: null}//完结时间
})

module.exports = mongoose.model('boxCount', boxCountSchema)
const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
	carid: {type:String,required:true},//车牌号码
	cartype: {type:String},//车型信息
    carsize: { type:String},//车辆尺寸
    cardate:{type:Date},//加入时间
    cartimes:{type:String},//出车次数
    carnote:{type:String}//出车备注
})

module.exports = mongoose.model('Car', carSchema)
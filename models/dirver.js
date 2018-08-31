const mongoose = require('mongoose')

const dirverSchema = mongoose.Schema({
	dirvername: {type:String,required:true},//人员姓名
	dirverid: {type:String,required:true},//准证号码
    dirverphone: { type:String},//人员电话
    dirvercard:{type:String},//驾照类型
    dirverusername:{type:String,required:true},//人员用户名
    dirverpsw:{type:String,required:true},//人员密码
    image:{type:String,default: null},//司机照片
    dirvernote:{type:String}//备注
})

module.exports = mongoose.model('Dirver', dirverSchema)
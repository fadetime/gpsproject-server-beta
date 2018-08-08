//定义合作商
const mongoose = require('mongoose')

const clientASchema = mongoose.Schema({
	clientaname: {type:String,required:true},//合作商名称
	clientaaddress: {type:String},//合作商地址
    clientaphone: { type:String},//合作商电话
    clientastatus:{type:String, default:'active'},//合作商状态
    clientapostcode:{type:String},//合作商邮编
    clientausername:{type:String},//合作商用户名
    clientapsw:{type:String},//合作商密码
    clientacontract:{type:Number},//合作期限
    clientatime:{type:Date, default:Date.now()},//合作商起始时间
    clientamail:{type:String},//合作商邮件
})

module.exports = mongoose.model('ClientA', clientASchema)
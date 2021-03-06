//定义客户
const mongoose = require('mongoose')

const clientBSchema = mongoose.Schema({
	clientbname: {type:String,required:true},//客户名称
	clientbaddress: {type:String},//客户地址
    clientbphone: { type:String},//客户电话
    clientbstatus:{type:String},//客户状态
    clientbpostcode:{type:String},//客户邮编
    clientbline:{type:String,default:''},//客户线路
    clientbserve:{type:mongoose.Schema.Types.ObjectId,ref:'ClientA'},//服务商信息
})

module.exports = mongoose.model('ClientB', clientBSchema)
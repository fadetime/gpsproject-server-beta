//定义客户
const mongoose = require('mongoose')

const clientBSchema = mongoose.Schema({
    clientbname: { type: String, required: true },//客户名称
    clientbnameEN: { type: String },//英文名称
    note: { type: String },//备注
    noteEN: { type: String },//备注EN
    clientbaddress: { type: String },//客户地址
    clientbphone: { type: String },//客户电话
    clientbstatus: { type: String, default: 'active' },//客户状态
    clientbpostcode: { type: String },//客户邮编
    clientbline: { type: String, default: '' },//客户线路
    clientbserve: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientA', default: '5be941164fa82d2ec868bbf5' },//服务商信息
    clientbarea: { type: mongoose.Schema.Types.ObjectId, ref: 'areas' },//所属区域信息
    image: { type: String, default: null },//客户图片
    isNeedPic: { type: Boolean, default: false },//必要拍照
    timeLimit: { type: String },//限时
    NcSortNum: { type: Number, default: 999 },//客服后台顺序
    driverSortNum: { type: Number, default: 999 },//司机送货顺序
    basket: { type: Number, default: 0 },//用户所欠框数
    noOrderDay: { type: Number, default: 0 },//用户未下单天数
    changeNoOrderDate: { type: String, default: null }//用户未下单天数最后修改日期
})

module.exports = mongoose.model('ClientB', clientBSchema)
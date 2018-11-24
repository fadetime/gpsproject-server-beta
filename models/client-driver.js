const mongoose = require('mongoose')

const clientDriverSchema = mongoose.Schema({
    missiondate: { type: Date, default: Date.now },//线路时间
    missionline: { type: String, required: true },//线路名称
    missionnote: { type: String },//线路备注
    missiondirver: { type: String },//线路司机
    missionphone: { type: String },//线路电话-司机
    missioncar: { type: String },//线路车辆
    Car_id:{ type: String },//车辆_id
    CarCheck: { type: Boolean, default: false },//车辆检查
    missionclient: [
        {
            clientbname: { type: String },
            clientbnameEN: { type: String },
            clientbaddress: { type: String },
            clientbphone: { type: String },
            clientbpostcode: { type: String },
            clientbserve: { type: String },
            finishphoto: { type: String, default: null },//送货结束后的照片
            finishdate: { type: Date, default: null },//送货结束后的时间
            position: {//送货结束后的位置
                lat: { type:Number, default:null },
                lng: { type:Number, default:null }
            },
            isNeedPic:{ type :Boolean , default :false}, //照片必要
            image: { type: String, default: null }//客户图片
        }
    ]//线路客户
})

module.exports = mongoose.model('Missions', clientDriverSchema)
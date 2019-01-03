const mongoose = require('mongoose')

const missionSchema = mongoose.Schema({
    missiondate: { type: Date, default: Date.now },//线路时间
    missionline: { type: String, required: true },//线路名称
    missionLineEN: { type: String },//线路英文名称
    line_id: { type: String },//线路id
    missionnote: { type: String },//线路备注
    missiondirver: { type: String },//线路司机
    missionphone: { type: String },//线路电话-司机
    missioncar: { type: String },//线路车辆
    Car_id: { type: String },//车辆_id
    carCheck_id: { type: String },//检查记录id
    carCheckFirst: { type: Boolean, default: false },//出车检查
    carCheckFinish: { type: Boolean, default: false },//收车检查
    complete: { type: Boolean, default: false },//任务完成标签
    goTime:{type: String, default: null },//固定发车时间
    backTime:{type: String, default: null },//固定收车时间
    missionclient: [
        {
            clientbname: { type: String },
            clientbnameEN: { type: String },
            clientbaddress: { type: String },
            clientbphone: { type: String },
            clientbpostcode: { type: String },
            clientbserve: { type: String },
            isNeedPic: { type: Boolean, default: false },//拍照是否必要
            timeLimit: { type: String }, //要求时间
            finishphoto: { type: String, default: null },//送货结束后的照片
            finishdate: { type: Date, default: null },//送货结束后的时间
            position: {//送货结束后的位置
                lat: { type: Number, default: null },
                lng: { type: Number, default: null }
            },
            note: { type: String },
            noteEN: { type: String },
            image: { type: String, default: null }//客户图片
        }
    ]//线路客户
})

module.exports = mongoose.model('Mission', missionSchema)
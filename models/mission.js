const mongoose = require('mongoose')

const missionSchema = mongoose.Schema({
    missiondate: { type: Date, default: Date.now },//任务时间
    missionline: { type: String, required: true },//任务名称
    missionLineEN: { type: String },//任务英文名称
    line_id: { type: String },//任务id
    missionnote: { type: String },//任务备注
    missiondirver: { type: String },//任务司机
    missionphone: { type: String },//任务电话-司机
    missioncar: { type: String },//任务车辆
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
            image: { type: String, default: null },//客户图片
            isReturn: { type: Boolean, default: false },//属于退菜任务
            returnPool_id: { type: String, default: null },//退菜任务池_id
            receipt_id: { type: String }, //财务收款任务ID
            receipt_finish: { type: Boolean }, //财务收款任务是否完成
            receipt_date: { type: Date , default: null}, //财务收款任务完成时间
            receipt_remark: { type: String }, //财务收款任务留言
            receipt_image: { type: String } //财务收款任务图片
        }
    ]//线路客户
})

module.exports = mongoose.model('Mission', missionSchema)
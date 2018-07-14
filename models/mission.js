const mongoose = require('mongoose')

const missionSchema = mongoose.Schema({
    missiondate: { type: Date, default: Date.now },//线路时间
    missionline: { type: String, required: true },//线路名称
    missionnote: { type: String },//线路备注
    missiondirver: { type: String },//线路司机
    missionphone: { type: String },//线路电话-司机
    missioncar: { type: String },//线路车辆
    missionclient: [
        { 
        clientbname: { type: String } ,
        clientbaddress: { type: String } ,
        clientbphone: { type: String } ,
        clientbpostcode: { type: String } ,
        clientbserve: { type: String } 
    }
]//线路客户
})

module.exports = mongoose.model('Mission', missionSchema)
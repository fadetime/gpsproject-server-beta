const mongoose = require('mongoose')

//首页通知模型
const workStreamFolderSchema = mongoose.Schema({
    date: { type: Date, required: true },//生成时间
    name: { type: String, default: null },//文件夹名
    label: { type: String, default: null },//所属标签
    forder: { type: Boolean, default: true },//文件夹标识
    child: { type: Boolean, default: false },//是否为子文件夹
    content: [
        {
            child_id: { type: String, required: true },//子文件文件夹id
            name: { type: String, required: true },//子文件文件夹名字
            forder: { type: Boolean, required: true }//是否为文件夹
        }
    ]
})

module.exports = mongoose.model('workstreamFolders', workStreamFolderSchema)
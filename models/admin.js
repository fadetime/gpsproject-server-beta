const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    phone:{type: Number, required: true},
    password: { type: String, required: true },//管理员密码
    role:{type: String, required: true},
    entryDate: {type: Date}
})

module.exports = mongoose.model('clerks', adminSchema)
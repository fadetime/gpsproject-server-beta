const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    password: { type: String, required: true }//管理员密码
})

module.exports = mongoose.model('clerks', adminSchema)
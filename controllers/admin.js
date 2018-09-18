const Product = require('../models/admin')
const bcrypt = require('bcryptjs')

exports.admin_changePSW = (req, res, next) => {
    Product.findOne({ 'name': 'admin' })
        .then((doc) => {
            bcrypt.compare(req.body.oldpassword, doc.password)
                .then(bcdoc => {
                    if (bcdoc) {
                        let psw = bcrypt.hashSync(req.body.newpassword)
                        Product.updateOne({ 'name': 'admin' },{
                            password:psw
                        })
                        .then(() => {
                            res.send({
                                msg:'更新密码成功',
                                code:0
                            })
                        })
                        .catch(err => {
                            res.send({
                                msg:'更新密码出现错误',
                                code:2,
                                error:err
                            })
                        })
                    } else {
                        res.send({
                            msg: '密码错误，请重试',
                            code: 1
                        })
                    }
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: '修改数据时服务器发生错误',
                error: err
            })
        })
}
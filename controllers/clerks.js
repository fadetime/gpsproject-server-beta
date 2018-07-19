const mongoose = require('mongoose');
const Clerk = require('../models/clerk');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req,res,next)=>{
    Clerk.findOne({email:req.body.email})
    .then(doc=>{
        if(!doc){
            res.json({
                status:404,
                msg:'该账号不存在'
            })
        }else{
            bcrypt.compare(req.body.password,doc.password).then(result=>{
                if(result){
                    const token = jwt.sign(
                        {
                            phone:doc.phone,
                            name:doc.name,
                            _id:doc._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1 days'
                        }
                    )
                    res.json({
                        status:0,
                        msg:'登陆成功',
                        token:token,
                        payload:doc
                    })
                }else{
                    res.json({
                        status:2,
                        msg:'密码错误，请重试'
                    })
                }
            })
        }
    })
}
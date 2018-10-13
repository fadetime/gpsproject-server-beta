const Product = require('../models/client-driver')
const Company = require('../models/clienta')
const bcrypt = require('bcryptjs')

exports.client_company_get = (req, res, next) => {
    let startdate = new Date(req.body.startdate).getTime()
    let today = new Date().getTime()
    let configDay = 15 * 24 * 3600 * 1000
    if (startdate < today - configDay) {
        res.send({
            code: 1,
            msg: '历史数据已删除'
        })
    } else {
        let enddate = startdate + 86400000
        startdate = new Date(startdate).toISOString()
        enddate = new Date(enddate).toISOString()
        Product.find({ "missiondate": { "$gte": startdate, "$lt": enddate } })
            .then(doc => {
                if (!doc) {
                    res.send({
                        code: 1,
                        msg: '未找到该任务信息'
                    })
                } else {
                    let temparr = new Array()
                    let index = 0
                    let newArray = []
                    doc.forEach(x => {
                        temparr[index] = {
                            name: '',
                            missiondate:'',
                            array: []
                        }
                        x.missionclient.forEach(y => {
                            if (y.clientbserve == req.body.username) {
                                temparr[index].name = x.missionline
                                temparr[index].missiondate = x.missiondate
                                temparr[index].array.push(y)
                            }
                        })
                        if (!temparr[index].name || !temparr[index].array) {
                            temparr.splice(index, 1)
                        } else {
                            newArray.push(temparr[index])
                        }
                        index += 1
                    })
                    res.send({
                        code: 0,
                        msg: '查找成功',
                        doc: newArray
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.send({
                    code: 2,
                    msg: '查找客户时出现问题时出现错误',
                    error: err
                })
            })
    }
}

exports.client_company_changepsw = (req, res, next) => {
    Company.findOne({ _id: req.body._id })
    .then(doc => {
        console.log(doc)
        bcrypt.compare(req.body.oldpassword, doc.clientapsw)
        .then(bcdoc => {
            if (bcdoc) {
                let psw = bcrypt.hashSync(req.body.newpassword)
                Company.updateOne({ _id: req.body._id }, {
                    clientapsw: psw
                })
                    .then(() => {
                        res.send({
                            msg: '更新密码成功',
                            code: 0
                        })
                    })
                    .catch(err => {
                        res.send({
                            msg: '更新密码出现错误',
                            code: 2,
                            error: err
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
    .catch(err => {
        console.log('an error be catched while change password')
        console.log(err)
        res.send({
            code:2,
            msg:'修改密码时出现错误',
            error:err
        })
    })
}
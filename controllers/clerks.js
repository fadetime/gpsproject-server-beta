const mongoose = require('mongoose');
const Clerk = require('../models/clerk');
const Driver = require('../models/dirver');
const Client = require('../models/clienta');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req, res, next) => {
    Clerk.findOne({ email: req.body.email })
        .then(doc => {
            if (!doc) {
                res.json({
                    status: 404,
                    msg: '该账号不存在'
                })
            } else {
                bcrypt.compare(req.body.password, doc.password).then(result => {
                    if (result) {
                        const token = jwt.sign(
                            {
                                phone: doc.phone,
                                name: doc.name,
                                _id: doc._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: '1 days'
                            }
                        )
                        res.json({
                            status: 0,
                            msg: '登陆成功',
                            token: token,
                            userName: doc.name
                        })
                    } else {
                        res.json({
                            status: 2,
                            msg: '密码错误，请重试'
                        })
                    }
                })
            }
        })
}

exports.user_login = (req, res, next) => {
    Driver.findOne({ dirverusername: req.body.username })
        .then(doc => {
            if (!doc) {
                res.json({
                    status: 404,
                    msg: '该账号不存在',
                    code: 1
                })
            } else {
                bcrypt.compare(req.body.password, doc.dirverpsw)
                    .then(item => {
                        if (item) {
                            const token = jwt.sign(
                                {
                                    dirvername: doc.dirvername,
                                    dirverphone: doc.dirverphone,
                                    _id: doc._id
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: '1 days'
                                }
                            )
                            res.json({
                                code: 0,
                                msg: '登陆成功',
                                token: token,
                                drivername: doc.dirvername,
                                drivercard: doc.dirvercard,
                                drivercard: doc.dirvercard,
                                driverphone: doc.dirverphone,
                                driverid: doc.dirverid,
                                _id: doc._id,
                                image: doc.image
                            })
                        } else {
                            res.json({
                                msg: '密码错误，请重试',
                                code: 1,
                                error: err
                            })
                        }
                    })
                    .catch(err => {
                        res.json({
                            msg: '服务器发生错误',
                            code: 2,
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                code: 2,
                msg: '查找时发生错误'
            })
        })
}

exports.company_login = (req, res, next) => {
    Client.findOne({ clientausername: req.body.username })
        .then(doc => {
            if (!doc) {
                res.json({
                    status: 404,
                    msg: '该账号不存在',
                    code: 1
                })
            } else {
                bcrypt.compare(req.body.password, doc.clientapsw)
                    .then(item => {
                        if (item) {
                            const token = jwt.sign(
                                {
                                    clientname: doc.clientaname,
                                    clientphone: doc.clientaphone,
                                    _id: doc._id
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: '1 days'
                                }
                            )
                            res.json({
                                code: 0,
                                msg: '登陆成功',
                                token: token,
                                name: doc.clientaname,
                                address: doc.clientaaddress,
                                phone: doc.clientaphone,
                                postcode: doc.clientapostcode,
                                email: doc.clientamail,
                                _id: doc._id
                            })
                        } else {
                            res.json({
                                status: 2,
                                msg: '密码错误，请重试',
                                code: 2
                            })
                        }
                    })
                    .catch(err => {
                        res.json({
                            msg: '密码错误，请重试',
                            code: 2,
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                msg: '查找账户时发生错误',
                code: 2,
                error: err
            })
        })
}
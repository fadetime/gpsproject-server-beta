const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// 连接MongoDB by using mongoose
mongoose.connect('mongodb://192.168.1.70:27017/test',{ useNewUrlParser: true })
mongoose.Promise = global.Promise

// 创建Routes实例
const carRoutes = require('./routes/car')
const dirverRoutes = require('./routes/dirver')
const clientARoutes = require('./routes/clienta')
const clientBRoutes = require('./routes/clientb')
const timesRoutes = require('./routes/times')
const missionRoutes = require('./routes/mission')
const clerksRoutes = require('./routes/clerks')
const clientDriverRoutes = require('./routes/client-driver')
const clientCompanyRoutes = require('./routes/client-company')

// **************************一系列的middleware************************

// 打印请求状态
app.use(morgan('dev'))

//使图片文件夹能被访问
app.use('/uploads', express.static('uploads'));

// Parsing the Body
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Handling CORS 跨域请求
app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin','*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
    	res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    	return res.status(200).json({})
    }
    next()
})

// *******************************************************************


// 使用Routes实例
app.use('/car',carRoutes)
app.use('/dirver',dirverRoutes)
app.use('/clienta',clientARoutes)
app.use('/clientb',clientBRoutes)
app.use('/times',timesRoutes)
app.use('/mission',missionRoutes)
app.use('/clerks',clerksRoutes)
app.use('/client-driver',clientDriverRoutes)
app.use('/client-company',clientCompanyRoutes)


// handling error
app.use((req,res,next) => {
	const error = new Error('Not found')
	error.status = 404
	next(error)
})

app.use((error,req,res,next) => {
	res.status(error.status || 500)
	res.json({
		error:{
			message: error.message
		}
	})
})


module.exports = app
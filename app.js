const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// 连接MongoDB by using mongoose
mongoose.connect('mongodb://127.0.0.1/test', { useNewUrlParser: true })
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
const adminRoutes = require('./routes/admin')
const logRoutes = require('./routes/log')
const areaRoutes = require('./routes/area')
const checkCar = require('./routes/checkCar')
const fixCar = require('./routes/fixCar')
const report = require('./routes/report')
const dayShiftMission = require('./routes/dayShiftMission')
const bill = require('./routes/bill')
const checkWorker = require('./routes/checkWorker')//检查员使用API
const checkWorkerDayShift = require('./routes/checkWorkerDayShift')//白班检查员使用API
const carWash = require('./routes/carWash')
const remainBillNumber = require('./routes/remainBillNumber')
const basket = require('./routes/basket')
const customerService = require('./routes/customerService')
const dayShiftDriverMission = require('./routes/dayShiftDriverMission')
const breakBoxReport = require('./routes/breakBoxReport')
const noticeRouter = require('./routes/notice')
const boxCount = require('./routes/boxCount')//框数统计
const Announcement = require('./routes/announcement')//首页通知
const setting = require('./routes/setting')//软件设置
const tripCount = require('./routes/tripCount')//车次菜框盘点
const template = require('./routes/dayShiftTemplate')//白班模板
const workStream_label = require('./routes/workStream/workStream_label')//工作流-标签
const workStream_mission = require('./routes/workStream/workStream_mission')//工作流-任务
const workStream_folder = require('./routes/workStream/workStream_folder')//工作流-文件夹

// **************************一系列的middleware************************
//log
var log4js = require('log4js');
log4js.configure({
	appenders: {
		// out: { type: 'stdout' },
		app: {
			type: 'dateFile', 
			filename: 'logs/',
			pattern:'yyyy-MM-dd.log',
			alwaysIncludePattern: true
		}
	},
	categories: {
		default: { appenders: [ 'app'], level: 'debug' }
	},
	replaceConsole: true
});
var logger = log4js.getLogger('app');
logger.level = 'debug'
app.use(log4js.connectLogger(logger));


// 打印请求状态
app.use(morgan('dev'))

//使图片文件夹能被访问
app.use('/uploads', express.static('uploads'));

// Parsing the Body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Handling CORS 跨域请求
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
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
app.use('/car', carRoutes)
app.use('/dirver', dirverRoutes)
app.use('/clienta', clientARoutes)
app.use('/clientb', clientBRoutes)
app.use('/times', timesRoutes)
app.use('/mission', missionRoutes)
app.use('/clerks', clerksRoutes)
app.use('/client-driver', clientDriverRoutes)
app.use('/client-company', clientCompanyRoutes)
app.use('/admin', adminRoutes)
app.use('/log', logRoutes)
app.use('/area', areaRoutes)
app.use('/checkcar', checkCar)
app.use('/fixcar', fixCar)
app.use('/report', report)
app.use('/dayShiftmission', dayShiftMission)
app.use('/bill', bill)
app.use('/checkworker', checkWorker)//检查员使用API
app.use('/checkWorkerDayShift', checkWorkerDayShift)//白班检查员使用API
app.use('/carwash', carWash)
app.use('/remainbillnum', remainBillNumber)//剩余订单计数
app.use('/basket', basket)
app.use('/customerService', customerService)
app.use('/dsdriver', dayShiftDriverMission)
app.use('/breakboxreport', breakBoxReport)//坏框申报
app.use('/notice', noticeRouter)//通知公告
app.use('/boxcount', boxCount)//框数统计
app.use('/announcement', Announcement)//首页通知
app.use('/setting', setting)//首页通知
app.use('/tripCount', tripCount)//车次菜框盘点
app.use('/template', template)//白班模板
app.use('/workStream_label', workStream_label)//创建任务流标签
app.use('/workStream_mission', workStream_mission)//创建任务流标签
app.use('/workStream_folder', workStream_folder)//创建任务文件夹

//定期清理短信提醒
const smsControllers = require('./models/openSMS')
let startTime = 0
setInterval(() => {
	let nowTime = new Date().getHours()
	if (startTime === nowTime) {
		let today = new Date()
		today.setHours(0)
		today.setMinutes(0)
		today.setSeconds(0)
		today.setMilliseconds(0)
		today.toISOString()
		smsControllers.deleteMany({ 'endDate': { $lt: today } })
			.then(doc => {
				console.log(doc)
			})
			.catch(err => {
				console.log(err)
			})
	}
}, 1000 * 60 * 60)



// handling error
app.use((req, res, next) => {
	const error = new Error('Not found')
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message
		}
	})
})


module.exports = app
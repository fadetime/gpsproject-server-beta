var muilter = require('./breakBoxReportConfig');
//multer有single()中的名称必须是表单上传字段的name名称。
var upload = muilter.single('image');
exports.dataInput = function(req, res, next) {
  upload(req, res, function(err) {
    //添加错误处理
    if (err) {
      return console.log(err);
    }
    //文件信息在req.file或者req.files中显示。
    // console.log(req)
    next();
  });
};
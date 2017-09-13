const path = require('path');
exports.keys = 'useName=BoalNg';
// 添加view配置
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
    },
};
/* exports.mongoose = {
  url: 'mongodb://127.0.0.1/test',
  options: {}
}; */
exports.jsonp = {
  whiteList: ['127.0.0.1','localhost'],
  callback: 'callback', // 识别 query 中的 `callback` 参数
  limit: 150, // 函数名最长为 100 个字符
};
// 日志切割
// 如果有需要按照文件大小切割的日志，在这里配置
exports.logrotator = {
  filesRotateByHour: [],           // 需要按小时切割的文件
  filesRotateBySize: [],           // 需要按大小切割的文件，其他日志文件仍按照通常方式切割
  maxFileSize: 50 * 1024 * 1024,   // 最大文件大小，默认为50m
  maxFiles: 10,                    // 按大小切割时，文件最大切割的份数
  rotateDuration: 60000,           // 按大小切割时，文件扫描的间隔时间
  maxDays: 31,                     // 日志保留最久天数
};
// 自定义logger
exports.customLogger = {
  dndcLogger: {
    file: path.join('./', 'myLog/dndc/dndc.log'),
    level: 'INFO',
  },
  keyLogger: {
    file: path.join('./', 'mylog/key/key.log'),
  }
}
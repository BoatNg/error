exports.keys = 'useName=BoalNg';
// 添加view配置
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
    },
};
exports.mongoose = {
  url: 'mongodb://127.0.0.1/test',
  options: {}
};
exports.jsonp = {
  whiteList: 'localhost',
  callback: 'callback', // 识别 query 中的 `callback` 参数
  limit: 150, // 函数名最长为 100 个字符
};
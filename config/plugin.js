// 模板引擎
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
}
// ORM-MongoDB
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
}
// validate
exports.validate = {
    enable: true,
    package: 'egg-validate'
}
// 关闭内置的 cluster 插件
module.cluster = {
    enable: false,
}
// 日志切割
exports.logrotator = {
  enable: true,
  package: 'egg-logrotator',
};
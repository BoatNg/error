const errorR = require('./router/errorR.js');
module.exports = app => {
    app.get('/',app.controller.news.list)
    errorR(app);
};
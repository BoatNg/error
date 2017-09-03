const appRouter = require('./router/errorR.js');
module.exports = app => {
    app.get('/',app.controller.news.list)
    //appRouter(app);
    const jsonp = app.jsonp();
    app.get('/api/v1/error', jsonp, app.controller.errorC.insert);
    app.get('/api/v1/ajaxError', jsonp, app.controller.errorC.ajaxInsert);
};
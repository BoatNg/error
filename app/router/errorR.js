module.exports = app => {
    const jsonp = app.jsonp();
    app.get('/api/v1/error', jsonp, app.controller.errorC.insert);
    app.get('/api/v1/ajaxError', jsonp, app.controller.errorC.ajaxInsert);
}
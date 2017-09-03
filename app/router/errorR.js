module.exports = app => {
    const jsonp = app.jsonp();
    app.post('/api/v1/error', jsonp, app.controller.errorC.insert);
    app.post('/api/v1/ajaxError', jsonp, app.controller.errorC.ajaxInsert);
}
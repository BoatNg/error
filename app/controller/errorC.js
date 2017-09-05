const sourceMap = require('source-map');
module.exports = app => {
    class ErrorController extends app.Controller {
        *insert() {
            const { ctx } = this;
            const body = ctx.request.query;
            console.log(body);
            const data = yield ctx.service.errorS.insert(body);
            ctx.body = data;
        }
        *ajaxInsert() {
            const { ctx } = this;
            const body = ctx.request.query;
            const data = yield ctx.service.errorS.ajaxInsert(body);
            ctx.body = data;
        }
    }
    return ErrorController;
}
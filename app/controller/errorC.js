const paramRule = {
    file: { type: 'string', required: true },
};
module.exports = app => {
    class ErrorController extends app.Controller {
        *insert() {
            const { ctx } = this;
            ctx.validate(createRule);
            const body = ctx.request.query;
            const host = ctx.host;
            const ip = ctx.ip;
            const cookie = ctx.get('cookie');
            const userAgent = ctx.get('User-Agent');
            const opt = {...body, ip, cookie, userAgent, host}
            const data = yield ctx.service.errorS.insert(opt);
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
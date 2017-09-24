const paramRule = {
    file: { type: 'string', required: true },
};
const uaPaser = require('ua-parser-js');
const typeDB = require("../myModel/errorMsgType.js");
module.exports = app => {
    class ErrorController extends app.Controller {
        *insert() {
            const { ctx } = this;
            //ctx.validate(paramRule);
            const body = ctx.request.query;
            const filter = this.filterFuc(body);
            console.log('========================')
            if(filter.res) {
                ctx.status = filter.status;
                ctx.body = filter.body;
                return
            }
            const host = ctx.host;
            const ip = ctx.ip;
            const cookie = ctx.get('cookie');
            let userAgent = ctx.get('User-Agent');
            userAgent = uaPaser(userAgent);
            const opt = {...body, ip, cookie, userAgent, host}
            const data = yield ctx.service.errorS.insert(opt);
            ctx.body = {
                data:[],
                status:1,
                msg:'success'
            };
        }
        filterFuc(obj) {
            console.log(typeDB);
            let res = false;
            let status = 200;
            let body = 'success';
            if( !obj.file ) {
                res = true;
                status = 422;
                body = 'the file is required';
            } else if(typeDB[obj.msg]) {
                res = true;
                status = 200;
                body = {
                    status:0,
                    msg:'server denied',
                    data:[]
                };
            }
            return {
                res,
                status,
                body
            };
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
const uaPaser = require('ua-parser-js');
const typeDB = require("../myModel/errorMsgType.js");
const timesDB = require("../myModel/timesCount.js");
module.exports = app => {
    class ErrorController extends app.Controller {
        *insert() {
            const { ctx } = this;
            const body = ctx.request.query;
            this.countFuc(body.msg);
            const filter = this.filterFuc(body);
            if(filter.res) {
                ctx.status = filter.status;
                ctx.body = filter.body;
                return
            }
            ctx.body = {
                data:[],
                status:1,
                msg:'success'
            };
            const host = ctx.host;
            const ip = ctx.ip;
            const cookie = ctx.get('cookie');
            let userAgent = ctx.get('User-Agent');
            userAgent = uaPaser(userAgent);
            const opt = {...body, ip, cookie, userAgent, host}
            console.log("========================1========================") 
            app.myEvent.emit('logEvent', opt); 
            console.log("========================3========================") 
        }
        countFuc(msg) {
            timesDB[msg] = timesDB[msg] || 0;
            timesDB[msg]++;
        }
        filterFuc(obj) { 
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
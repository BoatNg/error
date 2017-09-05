
module.exports = app => {
    class ErrorService extends app.Service {
        *insert (data) {
            const { ctx } = this;
            //const _db = ctx.model.ErrorM;
            //const res = yield ctx.model.ErrorM.create(data);
            
            // TODO source map 
            // TODO 写入log文件
            return res;
        }
        *ajaxInsert(data) {
            const { ctx } = this;
            const _db = ctx.model.ErrorM;
            const res = yield ctx.model.AjaxErrorM.create(data);
            return res;
        }
    }
    return ErrorService;
}
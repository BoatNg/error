
module.exports = app => {
    class ErrorService extends app.Service {
        *insert (data) {
            //rmnyzrflpfjobgeb
            const { ctx } = this;
            const _db = ctx.model.ErrorM;
            const res = yield ctx.model.ErrorM.create(data);
           
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
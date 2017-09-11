const sourceMap = require('source-map');
const rf=require("fs");  
// const data=rf.readFileSync("./app/sourcemap/bundle.js.map","utf-8");
// const rawSourceMap = JSON.parse(data);
module.exports = app => {
    class ErrorService extends app.Service {
        constructor(pra){
            super(pra);
            this.sourceMap = {}
        }
        *insert (data) {
            const { ctx } = this;
            const _db = ctx.model.ErrorM;
            // TODO source map 
            this.sourceMap = yield ctx.curl(`${data.file}.map`, {
                dataType: 'json',
                timeout: 3000,
            });
            if( typeof this.sourceMap.data !== 'object') {
                app.keyLogger(`service-errorS-insert-sourceMap:`, this.sourceMap);
            }
            const mapData = this.consumeMap(data)
            //const res = yield ctx.model.ErrorM.create(mapData);
            app.dndcLogger(mapData);
            return mapData;
        }
        consumeMap(data) {
            const line = +data.row
            const column = +data.col
            const consumer = new sourceMap.SourceMapConsumer(this.sourceMap.data) 
            const mapData = consumer.originalPositionFor({
                line,
                column
            });
            data.row = mapData.line;
            data.col = mapData.column;
            data.variable = mapData.name;
            return data
        }
        *ajaxInsert(data) {
            const { ctx } = this;
            // const _db = ctx.model.ErrorM;
            // const res = yield ctx.model.AjaxErrorM.create(data);
            app.dndcLogger(data);
            return data;
        }
    }
    return ErrorService;
}
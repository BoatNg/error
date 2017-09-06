const sourceMap = require('source-map');
const rf=require("fs");  
// const data=rf.readFileSync("./app/sourcemap/bundle.js.map","utf-8");
// const rawSourceMap = JSON.parse(data);
module.exports = app => {
    class ErrorService extends app.Service {
        
        *insert (data) {
            const { ctx } = this;
            const _db = ctx.model.ErrorM;
            // TODO source map 
            const result = yield ctx.curl(`${data.file}.map`, {
                dataType: 'json',
                timeout: 3000,
            });
            console.log(result);
            const mapData = this.consumeMap(result)
            data.row = mapData.line;
            data.col = mapData.column;
            data.variable = mapData.name;
            const res = yield ctx.model.ErrorM.create(data);
            // TODO 写入log文件
            return res;
        }
        consumeMap(data) {
            const line = +data.row
            const column = +data.col
            const consumer = new sourceMap.SourceMapConsumer(rawSourceMap) 
            const mapData = consumer.originalPositionFor({
                line,
                column
            });
            return mapData
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
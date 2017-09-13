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
            try {
                this.sourceMap = yield ctx.curl(`${data.file}.map`, {
                    dataType: 'json',
                    timeout: 3000,
                });
            } catch (e) {
                // http连接不成功
                app.keyLogger('service-errorS-insert-sourceMap-requestError:',e);
                app.dndcLogger(data);
                return data;
            }
            if( !this.sourceMap.data ) {
                // http连接成功 但获取不到data的值
                app.keyLogger(`service-errorS-insert-sourceMap:`, this.sourceMap);
                app.dndcLogger(data);
                return data;
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
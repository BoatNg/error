const sourceMap = require('source-map');
const typeDB = require('../myModel/errorMsgType.js');
function sleep(time) {
  console.log(new Date());
  let now = new Date().getTime();
  while (new Date().getTime() - now < time) { }
  console.log(new Date());
}
module.exports = app => {
    class ErrorService extends app.Service {
        constructor(pra){
            super(pra);
            this.sourceMap = {}
            this.statuMsg = {
                'httpErr':'connected error',
                'noMap':'non-existent',
                'mapSucc':'consumed successfully',
                'notJs':'not a javascript or url illegal'
            }
        }  
        *insert (data) {
            sleep(5000);
            console.log("========================2========================") 
            const { ctx } = this;
            const urlObj = this.parseFile(data.file);
            if(urlObj === null) {
                console.log('不是js')
                this.logMessage(data, 'notJs');
                return data;
            }
            // 读取cache 
            const cacheMap = app.cache.get( urlObj.noHash );
            if(cacheMap !== undefined && urlObj.file === cacheMap.hashFile) {
                console.log('map不变')
                this.sourceMap = cacheMap.sourceMap;
            } else {
                console.log('请求map')
                try { 
                    this.sourceMap = yield ctx.curl(`${urlObj.url}.map`, {
                        dataType: 'json',
                        timeout: 3000,
                    });
                } catch (e) {
                    // http连接不成功
                    this.logMessage(data,'httpErr');
                    return data;
                }
                // mapData 写入cache
                let res = app.cache.set(urlObj.noHash, {
                    sourceMap:this.sourceMap,
                    hashFile:urlObj.file
                });
            }

            if( !this.sourceMap.data ) {
                // http连接成功 但获取不到data的值
                this.logMessage(data, 'noMap');
                return data;
            }

            const mapData = this.consumeMap(data, 'mapSucc');
            this.logMessage(mapData, "mapSucc");
            return mapData;
        }
        parseFile(url) {
            // http://s.chebaba.com/js/dndc/1.8.2/dndc.js
            // http://s.chebaba.com/3rd/public-select/1.0.0/public-select.js
            // http://jt.chebaba.com/build/default/mobile/js/lib/base-590c0b8dd3.js
            // http://jt.chebaba.com/build/default/mobile/js/page/nissan-index-94d2edead0.js
            // test.js
            let arr = url.split('/');
            let file = arr.pop();
            let reg = new RegExp(/\.js$/,'i');
            if(!reg.test(file) || arr.length === 0) {
                return null;
            }
            let numReg = new RegExp(/\d+/,'g');
            if(file.indexOf('-') === -1 || !numReg.test(file)) {
                // common
                return {
                    url,
                    file:arr.pop(),// 标志位
                    noHash:file
                }
            }
            let content = file.split('.')[0].split('-');
            content.pop();
            let noHash = `${content.join('-')}.js`;
            return {
                url: `${arr.join('/')}/${noHash}`,
                file,
                noHash,
            }
        }
        logMessage(obj, flag) {
            obj.serviceStatu = this.statuMsg[flag];
            typeDB[obj.msg] = true;
            app.dndcLogger(obj);
        }
        consumeMap(data) {
            const line = +data.row
            const column = +data.col
            let consumer = {}
            try {
                consumer = new sourceMap.SourceMapConsumer(this.sourceMap.data) 
            } catch(e) {
                app.keyLogger('consumeMapError',e);
                return data
            }
            const mapData = consumer.originalPositionFor({
                line,
                column
            });
            data.row = mapData.line;
            data.col = mapData.column;
            data.variable = mapData.name;
            return data
        }
    }
    return ErrorService;
}
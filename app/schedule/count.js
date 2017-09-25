const nodemailer = require('nodemailer'); 
const transporter = nodemailer.createTransport({  
    service: 'qq',  
    auth: {  
        user: '465024099@qq.com',  
        pass: 'rmnyzrflpfjobgeb'  
    }  
});
function transportFuc(mailOptions) {
    transporter.sendMail(mailOptions, function (err, info) {  
        if (err) {  
            console.log(err);  
            return;
        }
        console.log('发送成功');  
    });
}
function clearObj(obj) {
    for(let key in obj) {
        delete obj[key];
    }
}
module.exports = {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    schedule: {
        //interval: '30s', 
        cron: '0 5 23 * * *',
        type: 'all', // 指定所有的 worker 都需要执行
    },
    // task 是真正定时任务执行时被运行的函数，第一个参数是一个匿名的 Context 实例
    * task(ctx) {
        console.log('=== corn ===')
        let timesCount = require("../myModel/timesCount.js");
        let errorMsgType = require("../myModel/errorMsgType.js");
        const mailOptions = {  
            from: '465024099@qq.com', // 发送者  
            to: '454999803@qq.com', // 接受者,可以同时发送多个,以逗号隔开  
            subject: '错误报表', // 标题  
            text: JSON.stringify(timesCount), // 文本  
        }; 
        transportFuc(mailOptions); 
        clearObj(timesCount);
        clearObj(errorMsgType);
    }
    
};
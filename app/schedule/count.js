var nodemailer = require('nodemailer'); 
module.exports = {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  schedule: {
    //interval: '30s', 
    cron: '0 5 23 * * *',
    type: 'all', // 指定所有的 worker 都需要执行
  },
  // task 是真正定时任务执行时被运行的函数，第一个参数是一个匿名的 Context 实例
    * task(ctx) {
        console.log('worker===================')
        const res = yield ctx.model.ErrorM.find({});
        const data = {
            times:res.length,
            type:'scriptError',
            time:new Date()
        };
        const result = yield ctx.model.ReportM.create(data);
        var transporter = nodemailer.createTransport({  
            service: 'qq',  
            auth: {  
                user: '465024099@qq.com',  
                pass: 'rmnyzrflpfjobgeb'  
            }  
        });
        var mailOptions = {  
            from: '465024099@qq.com', // 发送者  
            to: '454999803@qq.com', // 接受者,可以同时发送多个,以逗号隔开  
            subject: '错误报表', // 标题  
            text: JSON.stringify(data), // 文本  
            //html
        };  
        transporter.sendMail(mailOptions, function (err, info) {  
            if (err) {  
                console.log(err);  
                return;  
            }  

            console.log('发送成功');  
        }); 
    },
};
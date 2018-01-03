const EventEmitter = require('events').EventEmitter;
function sleep(time) {
  console.log(new Date());
  let now = new Date().getTime();
  while (new Date().getTime() - now < time) { }
  console.log(new Date());
}
module.exports = app => {
  app.messenger.once('egg-ready', () => {
    const myEvent = new EventEmitter();
    myEvent.on('logEvent', (data) => {
      setImmediate(() => {
        // create an anonymous context to access service
        const ctx = app.createAnonymousContext();
        // a convenient way to execute with generator function
        // can replaced by `co`
        ctx.runInBackground(function* () {
          yield ctx.service.errorS.insert(data);
        });
      });

    });
    app.myEvent = myEvent;
  });
}

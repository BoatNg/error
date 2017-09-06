module.exports = {
  dndcLogger(param) {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    return this.getLogger('dndcLogger').info('This is a ERROR Message', param);
  },
  keyLogger(msg, info) {
    return this.getLogger('keyLogger').info(msg, info);
  },
}
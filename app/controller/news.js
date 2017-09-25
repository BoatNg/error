const timesDB = require("../myModel/timesCount.js");
module.exports = app => {
  class NewsController extends app.Controller {
    * list() {
      let list = [];
      for(let key in timesDB) {
        list.push({
          type:`${key}`,
          times:`${timesDB[key]}`
        })
      }
      list = this.mergeSort(list);
      const dataList = {
        list,
      }
      
      yield this.ctx.render('news/list.tpl', dataList);
    }
    mergeSort(arr) {
      let len = arr.length;
      if(len<2) {
        return arr;
      }
      let middle = Math.floor(len / 2);
      let left = arr.slice(0, middle);
      let right = arr.slice(middle);
      return this.merge(this.mergeSort(left), this.mergeSort(right));
    }
    merge(left,right) {
      let result = [];
      while(left.length && right.length) {
        if(left[0].times >= right[0].times) {
          result.push(left.shift());
        } else {
          result.push(right.shift());
        }
      }
      while(left.length) {
        result.push(left.shift());
      }
      while(right.length) {
        result.push(right.shift());
      }
      return result;
    }
  }
  return NewsController;
};
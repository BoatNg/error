module.exports = app => {
  class NewsController extends app.Controller {
    * list() {
      yield this.ctx.render('news/list.tpl');
    }
  }
  return NewsController;
};
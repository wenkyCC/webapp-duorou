// 引入模板
var moreTpl = require('../tpl/more.string');

// 定义一个视图
SPA.defineView('more', {
  // 将模板写在body里
  html: moreTpl,
  plugins: [
    'delegated'
  ]
});
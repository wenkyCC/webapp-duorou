// 引入模板
var talkTpl = require('../tpl/talk.string');

// 定义一个视图
SPA.defineView('talk', {
  // 将模板写在body里
  html: talkTpl,

  plugins: [
    'delegated'
  ]

});

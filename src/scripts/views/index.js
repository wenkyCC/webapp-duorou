var indexTpl = require('../tpl/index.string');
//定义一个变量接收index.string这个模板

SPA.defineView("index",{
	// 将模板写在body里
	html: indexTpl,
	modules: [{
	    name: 'content',
	    views: ['index','article','talk','msg','my','more','guide'],
	    container: '.m-index-cont',
	    defaultTag: 'article'
  	}],
  	
  	plugins: [
    'delegated'
  	],
  	bindActions: {
	    // 切换子视图
	    'tap.switch': function (e, data) {
	      // 切换：launch方法里传入视图的名字
	      this.modules.content.launch(data.tag);
	      $(e.el).addClass('active').siblings().removeClass('active');
	    },
	
	    'tap.exit': function () {
	      // 关闭视图
	      this.hide();
	    }
	    
	}
})



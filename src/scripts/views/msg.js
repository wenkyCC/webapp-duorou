// 引入模板
var msgTpl = require('../tpl/msg.string');

// 定义一个视图
SPA.defineView('msg', {
  // 将模板写在body里
  html: msgTpl,
  plugins: [
    'delegated'
  ],
  
  bindEvents:{
  	Show: function (){
  		// swiper
	      var mySwiper = new Swiper('#msg-swiper', {
	        loop: false
	        
	      });
  		
  		
  	} //show swiper的
  }
});

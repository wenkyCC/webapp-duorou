var guideTpl = require('../tpl/guide.string');

SPA.defineView('guide',{
	html: guideTpl,
	bindEvents:{
		beforeShow: function () {
			console.log(11);
	      // swiper
	      var mySwiper = new Swiper('#guide-swiper', {
//	        loop: false
	        
	      });
	    }
	}

})

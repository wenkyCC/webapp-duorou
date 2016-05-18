var articleTpl = require('../tpl/article.string');
var maskTpl = require('../tpl/mask.string');//这是sidebar的蒙层

SPA.defineView('article',{
	html: articleTpl,
	
	plugins: [
    'delegated',
    	{
    	  name: 'avalon',
     	 options: function (vm) {
       	 vm.homeList = [];
       	 vm.homeListDl = [];
       	 // 保存是否加载完数据，显示loading...
        vm.isShowLoading = true;
      	}
   	 }
 	],
	// 给视图定义公共的属性和方法
init: {
//  formatArray: function (arr) {
//    var newArr = [];
//    for(var i = 0; i < Math.ceil(arr.length/2); i++){
//      newArr[i] = [];
//      newArr[i][0] = arr[2*i];
//      newArr[i][1] = arr[2*i+1];
//    }
//    return newArr;
//  },

    // 定义视图公共的home hot swiper对象
    myHomeHotSwiper: null,

    // 定义视图公共的home swiper对象
    myHomeSwiper: null
},
	bindActions: {
    
    // 显示sidebar
    'show.sidebar': function (e, data) {
      var that = this;
      var el = document.body;
      SPA.show('sidebar', {
        ani: {
          name: 'popup',
          width: 180,
          height: $(el).height(),
          direction: 'left'
        }
      }, el);

      // 存储临时的sidebar view
      var sidebarView = null;

      // 将mask 放到body里
      $(maskTpl).appendTo(el);

      // 获得sidebar视图
      SPA.getView('sidebar', function (view) {
        view.hide();
      });

      $('#m-mask').on('tap', function () {
        $(this).remove();
      });
    }
  },
	
	bindEvents:{
		beforeShow: function () {
	      // swiper
	      var mySwiper = new Swiper('#ban-swiper', {
	        loop: false,
	        pagination : '.swiper-pagination',
	        autoplay :3000
	      });
	       // 保存视图对象
	      var that = this;
	
	      // 获得avalon的vm
	      var vm = that.getVM();
		  var gapSize = 26;
	      // 第一次渲染数据
	      $.ajax({
//	        url: '/api/homeList.php',
			url:'/duorou/mock/article.json',
	        success: function (res) {
	        	vm.homeList = res.actdata;
				vm.homeListDl = res.cultivate;
				vm.isShowLoading = false;
		     }
	      });
	      
	      
	        // 下拉刷新，上拉加载
      // 使scroll pullToRefresh 滞后执行
      setTimeout(function () {
        // 获得SAP里定义的scroll对象，homeHotScroll通过data-scroll-id实现绑定的
        that.myScroll = that.widgets.homeHotScroll;
        var pageNo = 0;
        var pageSize = 6;
        that.myScroll.scrollBy(0, -gapSize);

        var head = $('.head img'),
            topImgHasClass = head.hasClass('up');
        var foot = $('.foot img'),
            bottomImgHasClass = head.hasClass('down');
        that.myScroll.on('scroll', function () {
            var y = this.y,
                maxY = this.maxScrollY - y;
            if (y >= 0) {
                !topImgHasClass && head.addClass('up');
                return '';
            }
            if (maxY >= 0) {
                !bottomImgHasClass && foot.addClass('down');
                return '';
            }
        });

        that.myScroll.on('scrollEnd', function () {
            if (this.y >= -100 && this.y < 0) {
                that.myScroll.scrollTo(0, -gapSize);
                head.removeClass('up');
            } else if (this.y >= 0) {
                head.attr('src', '/duorou/images/ajax-loader.gif');

                //ajax下拉刷新数据
                
                $.ajax({
                  url: '/duorou/mock/articlemore.json',
                  data: {
                    type: 'refresh'
                  },
                  success: function (res) {
                  	
                    vm.homeList = res.data.concat(vm.homeList);
//                  console.log(vm.homeList)
                    //vm.homeList = that.formatArray(vm.homeTempList.$model);
					//vm.homeList = res.data;
                    that.myScroll.scrollTo(0, -gapSize);
                    head.removeClass('up');
                    head.attr('src', '/duorou/images/arrow.png');
                  }
                });
            }

            var maxY = this.maxScrollY - this.y;
            if (maxY > -gapSize && maxY < 0) {
                var self = this;
                that.myScroll.scrollTo(0, self.maxScrollY + gapSize);
                foot.removeClass('down')
            } else if (maxY >= 0) {
                foot.attr('src', '/duorou/images/ajax-loader.gif');

                // ajax上拉加载更多数据
                $.ajax({
                  url: '/duorou/mock/articlenew.json',

                  // 请求参数，get：放置的url上，post:request体里
//                data: {
//                  page: pageNo,
//                  pageSize: pageSize
//                },

                  success: function (res) {
                    vm.homeListDl.pushArray(res.data);
                   // vm.homeList = that.formatArray(vm.homeTempList.$model);
                   // pageNo++;

                    // scroll 列表刷新
                    that.myScroll.refresh();
                    //that.myScroll.scrollTo(0, self.y + gapSize);
                    foot.removeClass('down');
                    foot.attr('src', '/duorou/images/arrow.png');

                    // that.homeTempList = that.homeTempList.concat(res.data);
                    // vm.homeList = that.formatArray(that.homeTempList.concat(res.data));
                  }
                });
            }
        });

        // 停靠菜单
//      var $fixedMenu = $('#fixed-menu');
//      var offsetTop = $fixedMenu.offset().top;
//
//      var myFS = that.widgets.myFollowScroll;
//      myFS.on('scroll', function(){
//
//        // Math.abs(this.y) 获得当前scroll滚动的y的坐标绝对值
//        // offsetTop - 44 获得menu距离文档顶部的高度，减去44，是为了和scroll滚动做比较
//        //console.log(Math.abs(this.y) + "/" + (offsetTop - 44));
//        if( Math.abs(this.y) >= offsetTop - 44 ) {
//          if($('body > #fixed-menu').length <= 0){
//            $fixedMenu.clone(true).appendTo('body');
//          }
//        } else {
//          $('body > #fixed-menu').remove();
//        }
//      });

      },0);
	  
	      
	    }
	}

})


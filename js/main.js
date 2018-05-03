


$(function(){

/*
	实现不同的屏幕分辨率显示不同尺寸的轮播图片
*/ 
	function changeImage(){
		//获取屏幕的尺寸
		var windowWidth = $(window).width();
		//判断屏幕是否需要调整图片
		var isSmallScreen = windowWidth <768;
		//遍历每一个item ，设置相应的背景图片
		$("#main_ad > .carousel-inner > .item").each(function(i,item){
			//缓存item对象
			var $item = $(item);
			//这里设置背景图的时候要加上url();
			// $item.css("backgroundImage",$item.data(isSmallScreen? "image-xs":"image-lg"));
			//定义一个url变量
			var url = $item.data(isSmallScreen? "image-xs":"image-lg");
            $item.css("backgroundImage","url('"+url+"')");
			//当屏幕宽度较小时，图片没有随着屏幕宽度大小而自适应。所以这里的背景图片的实现方式不好，改成直接用img的方式
			if(isSmallScreen){
				$item.html("<img src='"+url+"' alt='img"+i+"'>");
			}else{
				//这里把里面的img标签去掉，因为还存在的话会影响背景图片的展示

				$item.empty();
			}
		});
	}
	// trigger 方法就是 让绑定的事件立即执行一次
	$(window).on("resize",changeImage).trigger("resize");


	//增加悬浮提示
	$("[data-toggle='tooltip']").tooltip();

	/*
		设置下面tab选项卡的宽度 为所有的li的总和
	*/ 
	//获取ul元素
	var $ul = $("#products > .container >.ul_wapper > .nav-tabs ");

	var width = 0;
	//获取所有的li元素
	$ul.children().each(function(i,item){
		width += item.clientWidth;
	});

	//判断当前UL的宽是否超出了屏幕宽度，如果超出了就设置该宽度。如果没有超出就保持原状
	if($(window).width() < width){
		//设置UL的宽度为所以的li的总和
		$ul.width(width).parent().css("overflowX","scroll");
	}
	

	//设置切换改变标题内容
	$("#news>.container>.row .nav-pills >li>a").on("click",function(){
		var $this = $(this);
		var title = $this.data("title");
		$(".news-title").text(title);
	});



	/*
		实现手机端 左右滑动轮播图的效果
		1、获取手指在轮播图元素的滑动方向（左右）
		2、根据获得的方向选择上一张或者下一张图片来展示

	*/
	//获取轮播图容器
	var $carouselContainer = $("#main_ad");
	var startX = 0;
	var endX = 0;
	//注册滑动事件
	$carouselContainer.on("touchstart",function(e){
		//获取起始位置（通过输出该参数的方式来获取）
		// console.log(e.originalEvent.touches[0].clientX);
		startX = e.originalEvent.touches[0].clientX;
	});
	$carouselContainer.on("touchmove",function(e){
		endX = e.originalEvent.touches[0].clientX;//获取结束的位置
	});
	$carouselContainer.on("touchend",function(e){
		//获取起始位置（通过输出该参数的方式来获取）
		// console.log(e.originalEvent.touches[0].clientX);
		// endX = e.originalEvent.touches[0].clientX;//这样写的话会报错 瞬间值没有存储该变量
		//最后的时候判断手指移动的方向
		// if(endX-startX > 0){//向右滑动了
		// 	$carouselContainer.
		// }else{//向左滑动了

		// }
		//控制精度
		//当移动一定距离的时候才让图片轮播
		var minData = 50;
		//获取两个差的绝对值
		var distance = Math.abs(endX-startX);
		if(distance > minData){
			$carouselContainer.carousel(endX > startX ?"prev":"next");
		}
	});



});
//轮播插件created by qzguo 15/6/22
//使用方法：$(selector).pocketHorse(option,imageSrc)
$.fn.extend({
	pocketHorse : function(option,imageSrc){
		//初始化
		$('.imageArea').css('overflow','hidden').css('position','relative');
		$('.imageArea').find('img:gt(1)').hide();

		var imgSrcLength ;
		var imgWidth = $(this).width();
		var imgHeight = $(this).height();

		if (arguments[1]){ //imageSrc存在，通过数组配置,id标识pocketHorse
			imgSrcLength = imageSrc.length ;
			$('.imageArea').empty();
			for (var i=0;i<imgSrcLength;i++){
				var imgEle = '<img src="'+imageSrc[i]+'" id="pocketHorse'+i+'">' ;
				$('.imageArea').append(imgEle); 
			}
		}else{	//imageSrc不存在，通过原生html标签配置
			imgSrcLength = $('.imageArea').find('img').length ;
			$('.imageArea img').each(function(index,ele){
				ele.id = 'pocketHorse'+index ;
			})
		}
		//动画准备
		//幻灯片参数默认
		var defaultOption =  {
				dotControl : false ,
				blockControl :　true ,
				isControlerHide : true , 
				stayTime : 5000 , 
				transTime : 800 , 
				transDirection : 'left' ,
				transFunction : 'slide' ,
				transEasying : 'swing' 
			};
		if (!arguments[0]){
			option = defaultOption ;
		}else{
			option = $.extend({},defaultOption,option) ;
		}
		if (option.transFunction!=='slide'&&option.transFunction!=='push'&&option.transFunction!=='transparency'){ //设置高级模式默认值
			var reg = /cubic-bezier/g;
			if (!(option.transEasying==='ease'||option.transEasying==='linear'||option.transEasying==='ease-in'||option.transEasying==='ease-out'||option.transEasying==='ease-in-out'||reg.test(option.transEasying))){
				option.transEasying = 'ease';
			}
		}
		//动画元素初始化,为高级-碎片模式则需要把img标签换成div
		if (imgSrcLength === 0){

		}else if(imgSrcLength === 1){ //单个元素也要凑够两个元素
			var eleClone = $('.imageArea img#pocketHorse0').clone();
			eleClone.id = 'pocketHorse1' ;
			$('.imageArea').append(eleClone);
		}
		$('.imageArea #pocketHorse0').addClass('nowHorse') ;
		$('.imageArea #pocketHorse1').addClass('nextHorse') ;
		//全体hidden
		$('.imageArea').find('img').css({'position':'absolute','visibility': 'hidden'});
		//点阵生成
		if (option.dotControl){
			var dotDom = '<div class="dotWrap">'
			for (var i=0;i<imgSrcLength;i++){
				dotDom += '<span class="dot'+i+'"></span>' ;
			};
			dotDom += '</div>' ;
			$('.common-carouselImage').append(dotDom);
			$('.common-carouselImage .dotWrap').css({'width':'100%','height':'20px','position':'absolute','bottom':'0px','text-align':'center','z-index':11});
			$('.common-carouselImage .dotWrap>span').css({'background':'url(./image/dotGray.png) 0px 0px','width':'10px','height':'11px','display':'inline-block','margin-right':'2px','margin-left':'2px','cursor':'pointer'});
		}
		if (option.blockControl){
			$('.common-carouselImage .carousLeftArr,.common-carouselImage .carousLeftArr').show();
		}else{
			$('.common-carouselImage .carousLeftArr,.common-carouselImage .carousLeftArr').hide();
		}
		//根据动画方式初始化第一个和第二个
		var initNowHorse ; 
		var initNextHouse ;
		if (option.dotControl){
			$('.common-carouselImage .dotWrap .dot'+0).css({'background':'url(./image/dotGray.png) -11px 0px'}) ;
		}
		if (option.transFunction === 'transparency'){ //透明度转场方式
			$('.imageArea img.nowHorse').css({'opacity':1,'z-index':1,'visibility':'visible'});
			$('.imageArea img.nextHorse').css({'opacity':0,'z-index':2,'visibility':'visible'});
		}else if(option.transFunction === 'adv-scale'){
			var transTimeToSecond = option.transTime/1000 + 's';
			$('.imageArea img').css({'opacity':0,'z-index':1,'transform':'scale(2)','visibility':'hidden','transition':'all '+transTimeToSecond+' '+option.transEasying});
			$('.imageArea img.nowHorse').css({'opacity':1,'z-index':1,'transform':'scale(1)','visibility':'visible'});
			$('.imageArea img.nextHorse').css({'opacity':0,'z-index':2,'transform':'scale(2)','visibility':'visible'});	
		}else if(option.transFunction === 'adv-scaleRotate'){
			var transTimeToSecond = option.transTime/1000 + 's';
			$('.imageArea img').css({'opacity':0,'z-index':1,'transform':'scale(3) rotate(45deg)','transform-origin':'50% 50%','visibility':'hidden','transition':'all '+transTimeToSecond+' '+option.transEasying});
			$('.imageArea img.nowHorse').css({'opacity':1,'z-index':1,'transform':'scale(1) rotate(0deg)','visibility':'visible'});
			$('.imageArea img.nextHorse').css({'opacity':0,'z-index':2,'transform':'scale(3) rotate(45deg)','visibility':'visible'});	
		}else if(option.transFunction === 'adv-fragmentFly'){
			$('.common-carouselImage .carousLeftArr').remove();
			$('.common-carouselImage .carousRightArr').remove();
			$('.imageArea').empty();
			for (var i=0;i<imgSrcLength;i++){
				var imgEle = '<div data-src="'+imageSrc[i]+'" id="pocketHorse'+i+'"></div>' ;
				$('.imageArea').append(imgEle); 
			}
			$('.imageArea div').css({'position':'absolute','width':'100%','height':'100%','background-size':'100%','visibility':'hidden'});
			$('.imageArea #pocketHorse0').addClass('nowHorse').css({'background':'url('+$('.imageArea .nowHorse').data('src')+')'}) ;
			$('.imageArea #pocketHorse1').addClass('nextHorse') ;
			$('.imageArea .nowHorse').css({'opacity':1,'z-index':1,'visibility':'visible'});
			$('.imageArea .nextHorse').css({'opacity':0,'z-index':2,'visibility':'visible'});	
		}else{//如果是slide或push转场 
			switch (option.transDirection){
				case 'left':
					initNowHorse = 0 + 'px' ;
					initNextHouse = imgWidth + 'px';
					break;
				case 'right':
					initNowHorse = 0 + 'px' ;
					initNextHouse = -(imgWidth) + 'px';
					break;
				// case 'up':
				// 	$('.imageArea img.nowHorse').css({'top':0,'z-index':1,'visibility':'visible'});
				// 	$('.imageArea img.nextHorse').css({'top':imgHeight+'px','z-index':2,'visibility':'visible'});
				// 	break;
				// case 'down':
				// 	$('.imageArea img.nowHorse').css({'top':0,'z-index':1,'visibility':'visible'});
				// 	$('.imageArea img.nextHorse').css({'left':-(imgHeight)+'px','z-index':2,'visibility':'visible'});
				// 	break;
				// case 'none':
			 //    	$('.imageArea img.nowHorse').css({'top':0,'z-index':1,'visibility':'visible'});
				// 	$('.imageArea img.nextHorse').css({'left':0,'z-index':2,'visibility':'visible'});
				// 	break;
				// default:
				//     $('.imageArea img.nowHorse').css({'top':0,'z-index':1,'visibility':'visible'});
				// 	$('.imageArea img.nextHorse').css({'left':0,'z-index':2,'visibility':'visible'});
			}
			$('.imageArea img.nowHorse').css({'left':initNowHorse,'z-index':1,'visibility':'visible'});
			$('.imageArea img.nextHorse').css({'left':initNextHouse,'z-index':2,'visibility':'visible'});
		}
		//幻灯片动画主控制方法，第一个参数是配置值,第二个是否反向(反向按钮会用到),第三个是是否由点阵触发  
		var HorseRunning = function(option,positive,dotNum){
			//动画初始化，元素初处理，这里只在逆向点击时触发
			var HorseWait = function(){
				var $nowEle = $('.imageArea .nowHorse');
				var $nextEle = $('.imageArea .nextHorse');

				if(positive){
				    if (option.dotControl){
						var dotActiveNum = $('.nextHorse')[0].id.substr(11) ;
						$('.common-carouselImage .dotWrap>span').css({'background':'url(./image/dotGray.png) 0px 0px'}) ;
						$('.common-carouselImage .dotWrap .dot'+dotActiveNum).css({'background':'url(./image/dotGray.png) -11px 0px'}) ;
					}
					if (dotNum){//正向,还可能是dot控制的情况
						$nextEle.removeClass('nextHorse').css('visibility','hidden') ; 
						$('#pocketHorse'+dotNum).addClass('nextHorse').css('visibility','visible') ;
						$('.common-carouselImage .dotWrap>span').css({'background':'url(./image/dotGray.png) 0px 0px'}) ;
					    $('.common-carouselImage .dotWrap .dot'+dotNum).css({'background':'url(./image/dotGray.png) -11px 0px'}) ;
					}
				}else{
					if ($nowEle[0].id.substr(11) == 0){
						$('#pocketHorse'+(imgSrcLength-1)).addClass('nowHorse').css('visibility','visible');
					}else{
						$nowEle.prev().addClass('nowHorse').css('visibility','visible');
					}
					if ($nextEle[0].id.substr(11) == 0){
						$('#pocketHorse'+(imgSrcLength-1)).addClass('nextHorse');
					}else{
						$nextEle.prev().addClass('nextHorse');
					}	
					$nowEle.removeClass('nowHorse').css('visibility','visible');
					$nextEle.removeClass('nextHorse').css('visibility','hidden');
					if (option.dotControl){
						var dotActiveNum = $('.nowHorse')[0].id.substr(11) ;
						$('.common-carouselImage .dotWrap>span').css({'background':'url(./image/dotGray.png) 0px 0px'}) ;
						$('.common-carouselImage .dotWrap .dot'+dotActiveNum).css({'background':'url(./image/dotGray.png) -11px 0px'}) ;
					}	
				}	
			};
			HorseWait();
			
			//转场方向，left：从右向左；right：从左到右；up：从下到上；down：从上到下
			var nowHorseValue ;
			var nextHorseValue ;
			if (option.transFunction === 'transparency'){
				if (positive){
					$('.imageArea img.nowHorse').css({'opacity':1,'z-index':1,'visibility':'visible'});
					$('.imageArea img.nextHorse').css({'opacity':0,'z-index':2,'visibility':'visible'});
				}else{
					$('.imageArea img.nowHorse').css({'opacity':0,'z-index':1,'visibility':'visible'});
					$('.imageArea img.nextHorse').css({'opacity':1,'z-index':2,'visibility':'visible'});
				}
			}else if(option.transFunction === 'adv-scale'){
				if (positive){
					$('.imageArea img.nowHorse').css({'opacity':1,'z-index':1,'transform':'scale(1)'});
					$('.imageArea img.nextHorse').css({'opacity':0,'z-index':2,'transform':'scale(2)'});
				}else{
					$('.imageArea img.nowHorse').css({'opacity':0,'z-index':1,'transform':'scale(2)'});
					$('.imageArea img.nextHorse').css({'opacity':1,'z-index':2,'transform':'scale(1)'});
				}
			}else if(option.transFunction === 'adv-scaleRotate'){
				if (positive){
					$('.imageArea img.nowHorse').css({'opacity':1,'z-index':1,'transform':'scale(1) rotate(0deg)'});
					$('.imageArea img.nextHorse').css({'opacity':0,'z-index':2,'transform':'scale(3) rotate(45deg)'});
				}else{
					$('.imageArea img.nowHorse').css({'opacity':0,'z-index':1,'transform':'scale(3) rotate(45deg)'});
					$('.imageArea img.nextHorse').css({'opacity':1,'z-index':2,'transform':'scale(1) rotate(0deg)'});
				}
			}else if(option.transFunction === 'adv-fragmentFly'){
				if (positive){
					$('.imageArea img.nowHorse').css({'opacity':0,'z-index':1});
					$('.imageArea img.nextHorse').css({'opacity':0,'z-index':2});
				}else{
					$('.imageArea img.nowHorse').css({'opacity':0,'z-index':1});
					$('.imageArea img.nextHorse').css({'opacity':0,'z-index':2});
				}
			}else{
				switch (option.transDirection){
					case 'left':
						if (positive){
							switch (option.transFunction){
								case 'slide':
									nowHorseValue = 0 +'px';
									nextHorseValue = imgWidth +'px';
								break;
								case 'push':
									nowHorseValue = 0 +'px';
									nextHorseValue = imgWidth +'px';
								break;
							}
						}else{
							switch (option.transFunction){
								case 'slide':
									nowHorseValue = 0 +'px';
									nextHorseValue = 0 +'px';
								break;
								case 'push':
									nowHorseValue = -(imgWidth) +'px';
									nextHorseValue = 0 +'px';
								break;
							}
						}
					break;
					case 'right':
						if (positive){
							switch (option.transFunction){
								case 'slide':
									nowHorseValue = 0 +'px';
									nextHorseValue = -(imgWidth) +'px';
								break;
								case 'push':
									nowHorseValue = 0 +'px';
									nextHorseValue = -(imgWidth) +'px';
								break;
							}
						}else{
							switch (option.transFunction){
								case 'slide':
									nowHorseValue = 0 +'px';
									nextHorseValue = 0 +'px';
								break;
								case 'push':
									nowHorseValue = imgWidth +'px';
									nextHorseValue = 0 +'px';
								break;
							}
						}
					break;
					// case 'up':
					// 	$('.imageArea img.nowHorse').css({'top':0,'z-index':1,'visibility':'visible'});
					// 	$('.imageArea img.nextHorse').css({'top':imgHeight+'px','z-index':2,'visibility':'visible'});
					// 	break;
					// case 'down':
					// 	$('.imageArea img.nowHorse').css({'top':0,'z-index':1,'visibility':'visible'});
					// 	$('.imageArea img.nextHorse').css({'left':-(imgHeight)+'px','z-index':2,'visibility':'visible'});
					// 	break;
					// case 'none':
				 //    	$('.imageArea img.nowHorse').css({'top':0,'z-index':1,'visibility':'visible'});
					// 	$('.imageArea img.nextHorse').css({'left':0,'z-index':2,'visibility':'visible'});
					// 	break;
					// default:
					//     $('.imageArea img.nowHorse').css({'top':0,'z-index':1,'visibility':'visible'});
					// 	$('.imageArea img.nextHorse').css({'left':0,'z-index':2,'visibility':'visible'});
				};
				$('.imageArea img.nowHorse').css({'left':nowHorseValue,'z-index':1,'visibility':'visible'});	
				$('.imageArea img.nextHorse').css({'left':nextHorseValue,'z-index':2,'visibility':'visible'});
			}
			//动画结束的元素变化
			var HorseSleep = function(){
				var $nowEle = $('.imageArea .nowHorse');
				var $nextEle = $('.imageArea .nextHorse');
				if (positive){
					if (dotNum){//正向,还可能是dot控制的情况
						if ($nextEle[0].id.substr(11) == (imgSrcLength-1)){
							$('#pocketHorse0').addClass('nextHorse').css('visibility','visible') ;
						}else{
							$nextEle.next().addClass('nextHorse').css('visibility','visible') ;
						}
						$nextEle.removeClass('nextHorse').addClass('nowHorse') ;
						$nowEle.removeClass('nowHorse').css('visibility','hidden') ;
					}else{
						if ($nextEle[0].id.substr(11) == (imgSrcLength-1)){
							$('#pocketHorse0').addClass('nextHorse').css('visibility','visible');
						}else{
							$nextEle.next().addClass('nextHorse').css('visibility','visible');
						}
						if ($nowEle[0].id.substr(11) == (imgSrcLength-1)){
							$('#pocketHorse0').addClass('nowHorse');
						}else{
							$nowEle.next().addClass('nowHorse');
						}
						$nowEle.removeClass('nowHorse').css('visibility','hidden');
					    $nextEle.removeClass('nextHorse').css('visibility','visible');		   
					}
				}else{

					// if ($nextEle[0].id.substr(11) == 0){
					// 	$('#pocketHorse'+(imgSrcLength-1)).addClass('nextHorse').css('visibility','hidden');
					// }else{
					// 	$nextEle.prev().addClass('nextHorse').css('visibility','hidden');
					// }
					// if ($nowEle[0].id.substr(11) == 0){
					// 	$('#pocketHorse'+(imgSrcLength-1)).addClass('nowHorse').css('visibility','visible');
					// }else{
					// 	$nowEle.prev().addClass('nowHorse').css('visibility','visible');
					// }	
				}	
						
			};
			//转场方式，slide：滑动覆盖，push：推开，transparency：透明度变化
			if (option.transFunction === 'transparency'){ //透明度动画
				if (positive){
					$('img.nowHorse').animate({opacity:1},option.transTime,option.transEasying);
					$('img.nextHorse').animate({opacity:1},option.transTime,option.transEasying,HorseSleep);
				}else{	//反向转场
					$('img.nowHorse').animate({opacity:1},option.transTime,option.transEasying);
					$('img.nextHorse').animate({opacity:0},option.transTime,option.transEasying,HorseSleep);
				}
			}else if(option.transFunction === 'adv-scale'){
				if (positive){
					$('.imageArea img.nowHorse').css({'opacity':0,'transform':'scale(2)'});
					$('.imageArea img.nextHorse').css({'opacity':1,'transform':'scale(1)'});
					HorseSleep();
				}else{
					$('.imageArea img.nowHorse').css({'opacity':1,'transform':'scale(1)'});
					$('.imageArea img.nextHorse').css({'opacity':0,'transform':'scale(2)'});
					HorseSleep();
				}
			}else if(option.transFunction === 'adv-scaleRotate'){
				if (positive){
					$('.imageArea img.nowHorse').css({'opacity':0,'transform':'scale(3) rotate(45deg)'});
					$('.imageArea img.nextHorse').css({'opacity':1,'transform':'scale(1) rotate(0deg)'});
					HorseSleep();
				}else{
					$('.imageArea img.nowHorse').css({'opacity':1,'transform':'scale(1) rotate(0deg)'});
					$('.imageArea img.nextHorse').css({'opacity':0,'transform':'scale(3) rotate(45deg)'});
					HorseSleep();
				}
			}else if(option.transFunction === 'adv-fragmentFly'){
				if (positive){
					$('.imageArea .nextHorse').css({'opacity':1,'background':'url('+$('.imageArea .nowHorse').data('src')+')'});
					$('.imageArea .nowHorse').css({'opacity':0});
					$('.imageArea .nextHorse').fragmentFly({image_url:$('.imageArea .nextHorse').data('src'),ave_part:6,rm_part:[3,8] ,},{anime_dir:option.transDirection,path:[200,800],time:[0,option.transTime],opacity:[0,1]},function(){
						$('.imageArea .nowHorse').empty();
						HorseSleep();
					});
				}
			}else{
				switch (option.transDirection){
					case 'left':
						if (positive){
							switch (option.transFunction){
								case 'slide':
									$('img.nowHorse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHorse').animate({left:0,top:0},option.transTime,option.transEasying,HorseSleep);				
								break;
								case 'push':
									$('img.nowHorse').animate({left:-(imgWidth)+'px',top:0},option.transTime,option.transEasying);
									$('img.nextHorse').animate({left:0,top:0},option.transTime,option.transEasying,HorseSleep);				
								break;
							}
						}else{
							switch (option.transFunction){
								case 'slide':
									$('img.nowHorse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHorse').animate({left:(imgWidth)+'px',top:0},option.transTime,option.transEasying,HorseSleep);				
								break;
								case 'push':
									$('img.nowHorse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHorse').animate({left:imgWidth+'px',top:0},option.transTime,option.transEasying,HorseSleep);				
								break;
							}		
						}
					break;
					case 'right':
						if (positive){
							switch (option.transFunction){
								case 'slide':
									$('img.nowHorse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHorse').animate({left:0,top:0},option.transTime,option.transEasying,HorseSleep);				
								break;
								case 'push':
									$('img.nowHorse').animate({left:imgWidth+'px',top:0},option.transTime,option.transEasying);
									$('img.nextHorse').animate({left:0,top:0},option.transTime,option.transEasying,HorseSleep);				
								break;
							}
						}else{
							switch (option.transFunction){
								case 'slide':
									$('img.nowHorse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHorse').animate({left:-(imgWidth)+'px',top:0},option.transTime,option.transEasying,HorseSleep);				
								break;
								case 'push':
									$('img.nowHorse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHorse').animate({left:-(imgWidth)+'px',top:0},option.transTime,option.transEasying,HorseSleep);				
								break;
							}		
						}
					break;
					// case 'transparency':
					// 	$('img.nextHorse').animate({opacity:1},option.transTime,'swing');
					// 	$('img.nextHorse').animate({opacity:1},option.transTime,'swing',HorseSleep);
					// 	break;
					// default: 
					// 	$('img.nextHorse').animate({opacity:1},option.transTime,'swing');
					// 	$('img.nextHorse').animate({opacity:1},option.transTime,'swing',HorseSleep);
				}
			}			
		}

		//创建一个函数，用于返回一个无参数函数,用来在定时器中使用带参数的函数
		function _HorseRunning(option,positive,dotCtrlNum){
		       return function(){
		              HorseRunning(option,positive,dotCtrlNum);
		       }
		}
		//默认定时器，初始化启动，在点击dot或block后移除，被新的定时器取代
		var defaultTimer = setInterval(_HorseRunning(option,true),option.stayTime+option.transTime) ;

		//click绑定事件，向右按键点一次触发一次正向动作
		$('.carousRightArr').on('click',function(e){
			//清除的顺序要正确，如果把清除定时器放在return前面，在触发return的那次，整个幻灯片就没有定时器,就会停止	
			if($('.imageArea img').is(":animated")||$('.imageArea div').is(":animated")){
				return false;
			} else{
				HorseRunning(option,true);//触发一次正向动画
			}
			window.clearInterval(defaultTimer);	
			defaultTimer = setInterval(_HorseRunning(option,true),option.stayTime+option.transTime) ;
		});
		//click绑定事件，向左按键点一次触发一次反向动作
		$('.carousLeftArr').on('click',function(e){
			if($('.imageArea img').is(":animated")||$('.imageArea div').is(":animated")){
				return false;
			} else{
				HorseRunning(option,false);//触发一次反向动画
			}
			window.clearInterval(defaultTimer);	
			defaultTimer = setInterval(_HorseRunning(option,true),option.stayTime+option.transTime) ;
		});
		//轮播图hover之后，左右按钮浮现
		if (option.isControlerHide){ //采用浮现方式
			$('.common-carouselImage').css({'overflow':'hidden'});
			
			$('.carousLeftArr').css({'z-index':11});
			$('.carousRightArr').css({'z-index':11});
			// $('.common-carouselImage').hover(function(){//
				
			$('.common-carouselImage').hover(function(){
				$('.carousLeftArr').css({'transition': 'left 0.3s ease 0s'});
				$('.carousLeftArr').css({'left':'-5px'});
				$('.carousRightArr').css({'transition': 'right 0.3s ease 0s'});
				$('.carousRightArr').css({'right':'-5px'});
			},function(){
				$('.carousLeftArr').css({'transition': 'left 0.3s ease 0s'});
				$('.carousLeftArr').css({'left':'-60px'});
				$('.carousRightArr').css({'transition': 'right 0.3s ease 0s'});
				$('.carousRightArr').css({'right':'-60px'});
			});	
		}else{

		}
		//点阵控制事件
		if (option.dotControl){
			$('.common-carouselImage .dotWrap>span').on('click',function(event){		
				var eventJQ = $.event.fix(event || window.event);
				var $eventTargte = $(eventJQ.target) ;
				var dotNum = $(eventJQ.target).attr('class').substr(3) ;
				if($('.imageArea img').is(":animated")||$('.imageArea div').is(":animated")){
					return false;
				} else{
					HorseRunning(option,true,dotNum);//触发一次正向跳转到指定dot点的动画
				}
				window.clearInterval(defaultTimer);	
				defaultTimer = setInterval(_HorseRunning(option,true),option.stayTime+option.transTime) ;		
			})
		}else{

		}
	}
});
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
		//动画元素初始化
		if (imgSrcLength === 0){

		}else if(imgSrcLength === 1){ //单个元素也要凑够两个元素
			var eleClone = $('.imageArea img#pocketHorse0').clone();
			eleClone.id = 'pocketHorse1' ;
			$('.imageArea').append(eleClone);
		}
		$('.imageArea img#pocketHorse0').addClass('nowHourse') ;
		$('.imageArea img#pocketHorse1').addClass('nextHourse') ;
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
			$('.common-carouselImage .dotWrap').css({'width':'100%','height':'20px','position':'absolute','bottom':'0px','text-align':'center','z-index':'3'});
			$('.common-carouselImage .dotWrap>span').css({'background':'url(./image/dotGray.png) 0px 0px','width':'10px','height':'11px','display':'inline-block','margin-right':'2px','margin-left':'2px','cursor':'pointer'});
		}
		if (option.blockControl){
			$('.common-carouselImage .carousLeftArr,.common-carouselImage .carousLeftArr').show();
		}else{
			$('.common-carouselImage .carousLeftArr,.common-carouselImage .carousLeftArr').hide();
		}
		//根据动画方式初始化第一个和第二个
		var initNowHourse ; 
		var initNextHouse ;
		if (option.dotControl){
			$('.common-carouselImage .dotWrap .dot'+0).css({'background':'url(./image/dotGray.png) -12px 0px'}) ;
		}
		if (option.transFunction === 'transparency'){ //透明度转场方式
			$('.imageArea img.nowHourse').css({'opacity':1,'z-index':1,'visibility':'visible'});
			$('.imageArea img.nextHourse').css({'opacity':0,'z-index':2,'visibility':'visible'});
		}else{//如果是slide或push转场 
			switch (option.transDirection){
				case 'left':
					initNowHourse = 0 + 'px' ;
					initNextHouse = imgWidth + 'px';
					break;
				case 'right':
					initNowHourse = 0 + 'px' ;
					initNextHouse = -(imgWidth) + 'px';
					break;
				// case 'up':
				// 	$('.imageArea img.nowHourse').css({'top':0,'z-index':1,'visibility':'visible'});
				// 	$('.imageArea img.nextHourse').css({'top':imgHeight+'px','z-index':2,'visibility':'visible'});
				// 	break;
				// case 'down':
				// 	$('.imageArea img.nowHourse').css({'top':0,'z-index':1,'visibility':'visible'});
				// 	$('.imageArea img.nextHourse').css({'left':-(imgHeight)+'px','z-index':2,'visibility':'visible'});
				// 	break;
				// case 'none':
			 //    	$('.imageArea img.nowHourse').css({'top':0,'z-index':1,'visibility':'visible'});
				// 	$('.imageArea img.nextHourse').css({'left':0,'z-index':2,'visibility':'visible'});
				// 	break;
				// default:
				//     $('.imageArea img.nowHourse').css({'top':0,'z-index':1,'visibility':'visible'});
				// 	$('.imageArea img.nextHourse').css({'left':0,'z-index':2,'visibility':'visible'});
			}
			$('.imageArea img.nowHourse').css({'left':initNowHourse,'z-index':1,'visibility':'visible'});
			$('.imageArea img.nextHourse').css({'left':initNextHouse,'z-index':2,'visibility':'visible'});
		}
		//幻灯片动画主控制方法，第一个参数是配置值,第二个是否反向(反向按钮会用到),第三个是是否由点阵触发  
		var hourseRunning = function(option,positive,dotNum){
			//动画初始化，元素初处理，这里只在逆向点击时触发
			var hourseWait = function(){
				var $nowEle = $('img.nowHourse');
				var $nextEle = $('img.nextHourse');

				if(positive){
				    if (option.dotControl){
						var dotActiveNum = $('.nextHourse')[0].id.substr(11) ;
						$('.common-carouselImage .dotWrap>span').css({'background':'url(./image/dotGray.png) 0px 0px'}) ;
						$('.common-carouselImage .dotWrap .dot'+dotActiveNum).css({'background':'url(./image/dotGray.png) -12px 0px'}) ;
					}
					if (dotNum){//正向,还可能是dot控制的情况
						$nextEle.removeClass('nextHourse').css('visibility','hidden') ; 
						$('#pocketHorse'+dotNum).addClass('nextHourse').css('visibility','visible') ;
						$('.common-carouselImage .dotWrap>span').css({'background':'url(./image/dotGray.png) 0px 0px'}) ;
					    $('.common-carouselImage .dotWrap .dot'+dotNum).css({'background':'url(./image/dotGray.png) -12px 0px'}) ;
					}
				}else{
					if ($nowEle[0].id.substr(11) == 0){
						$('#pocketHorse'+(imgSrcLength-1)).addClass('nowHourse').css('visibility','visible');
					}else{
						$nowEle.prev().addClass('nowHourse').css('visibility','visible');
					}
					if ($nextEle[0].id.substr(11) == 0){
						$('#pocketHorse'+(imgSrcLength-1)).addClass('nextHourse').css('visibility','hidden');
					}else{
						$nextEle.prev().addClass('nextHourse').css('visibility','hidden');
					}	
					$nowEle.removeClass('nowHourse').css('visibility','hidden');
					$nextEle.removeClass('nextHourse').css('visibility','visible');
					if (option.dotControl){
						var dotActiveNum = $('.nowHourse')[0].id.substr(11) ;
						$('.common-carouselImage .dotWrap>span').css({'background':'url(./image/dotGray.png) 0px 0px'}) ;
						$('.common-carouselImage .dotWrap .dot'+dotActiveNum).css({'background':'url(./image/dotGray.png) -12px 0px'}) ;
					}	
				}	
			};
			hourseWait();
			
			//转场方向，left：从右向左；right：从左到右；up：从下到上；down：从上到下
			var nowHourseValue ;
			var nextHourseValue ;
			if (option.transFunction === 'transparency'){
				if (positive){
					$('.imageArea img.nowHourse').css({'opacity':1,'z-index':1,'visibility':'visible'});
					$('.imageArea img.nextHourse').css({'opacity':0,'z-index':2,'visibility':'visible'});
				}else{
					$('.imageArea img.nowHourse').css({'opacity':1,'z-index':1,'visibility':'visible'});
					$('.imageArea img.nextHourse').css({'opacity':1,'z-index':2,'visibility':'visible'});
				}
			}else{
				switch (option.transDirection){
					case 'left':
						if (positive){
							switch (option.transFunction){
								case 'slide':
									nowHourseValue = 0 +'px';
									nextHourseValue = imgWidth +'px';
								break;
								case 'push':
									nowHourseValue = 0 +'px';
									nextHourseValue = imgWidth +'px';
								break;
							}
						}else{
							switch (option.transFunction){
								case 'slide':
									nowHourseValue = 0 +'px';
									nextHourseValue = 0 +'px';
								break;
								case 'push':
									nowHourseValue = -(imgWidth) +'px';
									nextHourseValue = 0 +'px';
								break;
							}
						}
					break;
					case 'right':
						if (positive){
							switch (option.transFunction){
								case 'slide':
									nowHourseValue = 0 +'px';
									nextHourseValue = -(imgWidth) +'px';
								break;
								case 'push':
									nowHourseValue = 0 +'px';
									nextHourseValue = -(imgWidth) +'px';
								break;
							}
						}else{
							switch (option.transFunction){
								case 'slide':
									nowHourseValue = 0 +'px';
									nextHourseValue = 0 +'px';
								break;
								case 'push':
									nowHourseValue = imgWidth +'px';
									nextHourseValue = 0 +'px';
								break;
							}
						}
					break;
					// case 'up':
					// 	$('.imageArea img.nowHourse').css({'top':0,'z-index':1,'visibility':'visible'});
					// 	$('.imageArea img.nextHourse').css({'top':imgHeight+'px','z-index':2,'visibility':'visible'});
					// 	break;
					// case 'down':
					// 	$('.imageArea img.nowHourse').css({'top':0,'z-index':1,'visibility':'visible'});
					// 	$('.imageArea img.nextHourse').css({'left':-(imgHeight)+'px','z-index':2,'visibility':'visible'});
					// 	break;
					// case 'none':
				 //    	$('.imageArea img.nowHourse').css({'top':0,'z-index':1,'visibility':'visible'});
					// 	$('.imageArea img.nextHourse').css({'left':0,'z-index':2,'visibility':'visible'});
					// 	break;
					// default:
					//     $('.imageArea img.nowHourse').css({'top':0,'z-index':1,'visibility':'visible'});
					// 	$('.imageArea img.nextHourse').css({'left':0,'z-index':2,'visibility':'visible'});
				};
				$('.imageArea img.nowHourse').css({'left':nowHourseValue,'z-index':1,'visibility':'visible'});	
				$('.imageArea img.nextHourse').css({'left':nextHourseValue,'z-index':2,'visibility':'visible'});
			}
			//动画结束的元素变化
			var hourseSleep = function(){
				var $nowEle = $('img.nowHourse');
				var $nextEle = $('img.nextHourse');
				if (positive){
					if (dotNum){//正向,还可能是dot控制的情况
						if ($nextEle[0].id.substr(11) == (imgSrcLength-1)){
							$('#pocketHorse0').addClass('nextHourse').css('visibility','visible') ;
						}else{
							$nextEle.next().addClass('nextHourse').css('visibility','visible') ;
						}
						$nextEle.removeClass('nextHourse').addClass('nowHourse') ;
						$nowEle.removeClass('nowHourse').css('visibility','hidden') ;
					}else{
						if ($nextEle[0].id.substr(11) == (imgSrcLength-1)){
							$('#pocketHorse0').addClass('nextHourse').css('visibility','hidden');
						}else{
							$nextEle.next().addClass('nextHourse').css('visibility','hidden');
						}
						if ($nowEle[0].id.substr(11) == (imgSrcLength-1)){
							$('#pocketHorse0').addClass('nowHourse').css('visibility','visible');
						}else{
							$nowEle.next().addClass('nowHourse').css('visibility','visible');
						}
						$nowEle.removeClass('nowHourse').css('visibility','hidden');
					    $nextEle.removeClass('nextHourse').css('visibility','visible');	
					   
					}
				}else{

					// if ($nextEle[0].id.substr(11) == 0){
					// 	$('#pocketHorse'+(imgSrcLength-1)).addClass('nextHourse').css('visibility','hidden');
					// }else{
					// 	$nextEle.prev().addClass('nextHourse').css('visibility','hidden');
					// }
					// if ($nowEle[0].id.substr(11) == 0){
					// 	$('#pocketHorse'+(imgSrcLength-1)).addClass('nowHourse').css('visibility','visible');
					// }else{
					// 	$nowEle.prev().addClass('nowHourse').css('visibility','visible');
					// }	
				}	
						
			};
			//转场方式，slide：滑动覆盖，push：推开，transparency：透明度变化
			if (option.transFunction === 'transparency'){ //透明度动画
				if (positive){
					$('img.nowHourse').animate({opacity:1},option.transTime,option.transEasying);
					$('img.nextHourse').animate({opacity:1},option.transTime,option.transEasying,hourseSleep);
				}else{	//反向转场
					$('img.nowHourse').animate({opacity:1},option.transTime,option.transEasying);
					$('img.nextHourse').animate({opacity:0},option.transTime,option.transEasying,hourseSleep);
				}
			}else{
				switch (option.transDirection){
					case 'left':
						if (positive){
							switch (option.transFunction){
								case 'slide':
									$('img.nowHourse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHourse').animate({left:0,top:0},option.transTime,option.transEasying,hourseSleep);				
								break;
								case 'push':
									$('img.nowHourse').animate({left:-(imgWidth)+'px',top:0},option.transTime,option.transEasying);
									$('img.nextHourse').animate({left:0,top:0},option.transTime,option.transEasying,hourseSleep);				
								break;
							}
						}else{
							switch (option.transFunction){
								case 'slide':
									$('img.nowHourse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHourse').animate({left:(imgWidth)+'px',top:0},option.transTime,option.transEasying,hourseSleep);				
								break;
								case 'push':
									$('img.nowHourse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHourse').animate({left:imgWidth+'px',top:0},option.transTime,option.transEasying,hourseSleep);				
								break;
							}		
						}
					break;
					case 'right':
						if (positive){
							switch (option.transFunction){
								case 'slide':
									$('img.nowHourse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHourse').animate({left:0,top:0},option.transTime,option.transEasying,hourseSleep);				
								break;
								case 'push':
									$('img.nowHourse').animate({left:imgWidth+'px',top:0},option.transTime,option.transEasying);
									$('img.nextHourse').animate({left:0,top:0},option.transTime,option.transEasying,hourseSleep);				
								break;
							}
						}else{
							switch (option.transFunction){
								case 'slide':
									$('img.nowHourse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHourse').animate({left:-(imgWidth)+'px',top:0},option.transTime,option.transEasying,hourseSleep);				
								break;
								case 'push':
									$('img.nowHourse').animate({left:0,top:0},option.transTime,option.transEasying);
									$('img.nextHourse').animate({left:-(imgWidth)+'px',top:0},option.transTime,option.transEasying,hourseSleep);				
								break;
							}		
						}
					break;
					// case 'transparency':
					// 	$('img.nextHourse').animate({opacity:1},option.transTime,'swing');
					// 	$('img.nextHourse').animate({opacity:1},option.transTime,'swing',hourseSleep);
					// 	break;
					// default: 
					// 	$('img.nextHourse').animate({opacity:1},option.transTime,'swing');
					// 	$('img.nextHourse').animate({opacity:1},option.transTime,'swing',hourseSleep);
				}
			}			
		}

		//创建一个函数，用于返回一个无参数函数,用来在定时器中使用带参数的函数
		function _hourseRunning(option,positive,dotCtrlNum){
		       return function(){
		              hourseRunning(option,positive,dotCtrlNum);
		       }
		}
		//默认定时器，初始化启动，在点击dot或block后移除，被新的定时器取代
		var defaultTimer = setInterval(_hourseRunning(option,true),option.stayTime+option.transTime) ;

		//click绑定事件，向右按键点一次触发一次正向动作
		$('.carousRightArr').on('click',function(e){
			//清除的顺序要正确，如果把清除定时器放在return前面，在触发return的那次，整个幻灯片就没有定时器,就会停止	
			if($('.imageArea img').is(":animated")){
				return false;
			} else{
				hourseRunning(option,true);//触发一次正向动画
			}
			window.clearInterval(defaultTimer);	
			defaultTimer = setInterval(_hourseRunning(option,true),option.stayTime+option.transTime) ;
		});
		//click绑定事件，向左按键点一次触发一次反向动作
		$('.carousLeftArr').on('click',function(e){
			if($('.imageArea img').is(":animated")){
				return false;
			} else{
				hourseRunning(option,false);//触发一次反向动画
			}
			window.clearInterval(defaultTimer);	
			defaultTimer = setInterval(_hourseRunning(option,true),option.stayTime+option.transTime) ;
		});
		//轮播图hover之后，左右按钮浮现
		if (option.isControlerHide){ //采用浮现方式
			$('.common-carouselImage').css({'overflow':'hidden'});
			$('.carousLeftArr').css({'z-index':3});
			$('.carousRightArr').css({'z-index':3});
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
				if($('.imageArea img').is(":animated")){
					return false;
				} else{
					hourseRunning(option,true,dotNum);//触发一次正向跳转到指定dot点的动画
				}
				window.clearInterval(defaultTimer);	
				defaultTimer = setInterval(_hourseRunning(option,true),option.stayTime+option.transTime) ;		
			})
		}else{

		}
	}
});
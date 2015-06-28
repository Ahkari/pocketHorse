//页面初始化
$(function(){
	var winHeight = $(window).height() ;
	var headerHeight = $('.header').height() ; 
	var titleHeight = winHeight - headerHeight ;
	$('.title').css({'height':titleHeight});
	$('.model').css({'height':titleHeight - 50});
	$('.logo').css({'height':'148px' , 'left':70 ,'top': 40 })
	$('.viewBtn').css({'visibility':'hidden'});
	//初始化动画
	infoShow();


	// using the event helper  
	$('section').mousewheel(function(event, delta) {  //-1 向下, 1向上
		if($('.title .info,.title .info2').is(":animated")){
			return false;
		}
		var eventJq = $.event.fix(event || window.event); 
		var $target = $(eventJq.target) ;
		if (($target.hasClass('title')||$target.parents('section').hasClass('title') )&& delta=== -1){
			$('.title').css({'height' : '50px','background-color':'#1c1c1c'});
			$('.model').css({'background-color':'#272727'});

			$('.logo').css({'height':'50px' , 'left':0 ,'top':0});
			$('.viewBtn').css({'visibility':'visible'});
			$('.viewBtn').css({'opacity':'1'});

			infoHide();
		}else if($target.hasClass('title') && delta === 1){
			$('.title').css({'height':titleHeight ,'background-color':'#272727'});
			$('.model').css({'background-color':'#1c1c1c'});
		
			$('.logo').css({'height':'148px' , 'left':70 ,'top': 40 });
			$('.viewBtn').css({'opacity':'0'});
			setTimeout(function(){$('.viewBtn').css({'visibility':'hidden'})},300);

			infoShow();
		}else if($target.hasClass('chooseMain') || $target.parents('div').hasClass('chooseMain')){
			if (delta === -1){
				$('.main').css({'left':-680});
				$('.tab').css({'background-color':'#383838'});
				$('.choose').removeClass('tab-active');
				$('.choose').css({'background-color':'rgba(255, 255, 255, 0.08)'})
				$('.config').addClass('tab-active');
				$('.config').css({'background-color':'rgb(45, 45, 45)'});
			}
		}else if($target.hasClass('configMain') || $target.parents('div').hasClass('configMain')){
			if (delta === -1){
				$('.main').css({'left':-1570});
				$('.tab').css({'background-color':'#222222'});
				$('.config').removeClass('tab-active');
				$('.config').css({'background-color':'rgba(255, 255, 255, 0.08)'})
				$('.about').addClass('tab-active');
				$('.about').css({'background-color':'rgb(68, 68, 68)'})
			}else if(delta === 1){
				$('.main').css({'left':210});
				$('.tab').css({'background-color':'#2f2f2f'});
				$('.config').removeClass('tab-active');
				$('.config').css({'background-color':'rgba(255, 255, 255, 0.08)'})
				$('.choose').addClass('tab-active');
				$('.choose').css({'background-color':'rgb(39, 39, 39)'});
			}
		}else if($target.hasClass('aboutMain') || $target.parents('div').hasClass('aboutMain')){
			if (delta === -1){

			}else if(delta === 1){
				$('.main').css({'left':-680});
				$('.tab').css({'background-color':'#383838'});
				$('.about').removeClass('tab-active');
				$('.about').css({'background-color':'rgba(255, 255, 255, 0.08)'})
				$('.config').addClass('tab-active');
				$('.config').css({'background-color':'rgb(45, 45, 45)'})
			}
		}



	});

	
	$('.chooseMain .transModel').click(function(e){
		var eventJq = $.event.fix(e || window.event); 
		$target = $(eventJq.target);
		$target = $target.parent();
		if ($target.hasClass('transModel')){
			var X_offset = $target.offset().left - $('.transModel.adv-sr').offset().left;
			var Y_offset = $target.offset().top - $('.transModel.adv-sr').offset().top;
			$('.transModel2').css({'opacity':1,'left': 80 + X_offset,'top': 48 + Y_offset });
			$('.transModel p').removeClass('list-active');
			$target.find('p').addClass('list-active');
		}
	})


})

function infoShow(){
	setTimeout(function(){
		$('.info').animate({
			opacity: 0.8,
			left: 600},
			1000,
			'easeOutQuad', function() {
			/* stuff to do after animation is complete */
			$('.info2').animate({opacity: 0.8, left: 728}, 
			1200,
			'easeOutQuad');
		});
	},700);
}
function infoHide(){
	$('.info').animate({
		opacity: 0,
		left: 700},
		1000,
		'easeInQuad', function() {
		$('.info').css({'left': 550}) ; 
	});
	$('.info2').animate({opacity: 0, left: 828}, 
	1000,
	'easeInQuad',function(){
		$('.info2').css({'left': 678})
	});
}
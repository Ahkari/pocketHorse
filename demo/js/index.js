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
		if ($target.hasClass('title') && delta=== -1){
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
		}
	});


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
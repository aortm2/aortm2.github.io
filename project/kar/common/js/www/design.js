jQuery(function($){
	//lnb
	$.fn.lnb = function(){
		return this.each(function(){
			var $menu = $(this);
			$menu.find('li').each(function(){
				var $sub = $(this).find('a + ul');
				$sub.addClass('sub');
				if ($sub.length > 0) {
					$(this).find('> a').addClass('opener');
				}
				if ($(this).hasClass('on')) {
					$(this).find('>ul').css('display', 'block');
				};
			});
			var $menu_openers = $menu.find('.opener');
			$menu_openers.on('click', function(e){
				e.preventDefault();
				var $Layer = $(this).next('ul');
				console.log($Layer)
				if ($Layer.is(':hidden')){
					$Layer.stop().slideDown(function(){
						$(this).parent('li').addClass('on');
					});
				} else {
					$Layer.stop().slideUp(function(){
						$(this).parent('li').removeClass('on');
					});
				}
			});
		});
	};
	$('#sidr .nav').lnb();
	//gnb
	(function(){
		var header = $('#header');
		var wrap = $('#header .frm');
		var gnb = wrap.find('#gnb');
		var gnb_li = gnb.find('>li');
		var gnb_sub = gnb_li.find('>ul');
		function menu_On(){
			var t = $(this);
			if (!t.hasClass('on')){
				gnb_li.removeClass('on');
				t.addClass('on');
				header.addClass('active');
			}
			wrap.stop().animate({'height':'370'},200);
		};
		function menu_Off(){
			gnb_li.removeClass('on');
			header.removeClass('active');
			wrap.stop().animate({'height':'90'},200);
		};
		gnb_li.mouseenter(menu_On).focusin(menu_On);
		wrap.mouseleave(menu_Off).focusout(menu_Off);
	}());

	header_scroll();
	function header_scroll(){
		if ($(this).scrollTop() > 0) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	};
	$(window).scroll(function() {
		header_scroll();
	});

	
	$('.nav_toggle').on("click",function(){
		$('#sidr').toggleClass('open');
	});
	$('#sidr .tog').on("click",function(){
		$('#sidr').removeClass('open');
	});

	//center popup
	$('.ct_dialog .p_close').on('click', function(e){
		e.preventDefault();
		var popup = $(this).parents('.ct_dialog');
		if(popup.length > 0){
			popup.fadeOut();
		//$('body').css('overflow', 'auto');
		}
	});

	// board_ban
	if($(".visual .banner .sd").length > 0){
		$(".visual .banner .sd").slick({
			dots:true,
			appendDots:$(".ban_dot"),
			customPaging: function (slide, i) {
				return
			},
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows:false
		});
		
		var play = $(".visual .banner .ban_play");
		
		play.on('click', function(){
			if ($(".visual .banner .sd").attr('data-slick-autoplay-status') == 'N') {
				$(".visual .banner .sd").attr('data-slick-autoplay-status', 'Y');
				$(".visual .banner .sd").slick('slickPlay');
				$(this).attr('title','슬라이드 정지').removeClass('on');
			}
			else if ($(".visual .banner .sd").attr('data-slick-autoplay-status') == 'Y') {
				$(".visual .banner .sd").attr('data-slick-autoplay-status', 'N');
				$(".visual .banner .sd").slick('slickPause');
				$(this).attr('title','슬라이드 재생').addClass('on');
			}
		});
	}

	// board_ban

	if($(".board_ban .sd").length > 0){
		$(".board_ban .sd").slick({
			dots:false,
			arrows: true,
			appendArrows:$('.ban_arrow'),
			customPaging: function (slide, i) {
				return
			},
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
		});
		
		var play = $(".board_ban .ban_play");
		
		play.on('click', function(){
			if ($(".board_ban .sd").attr('data-slick-autoplay-status') == 'N') {
				$(".board_ban .sd").attr('data-slick-autoplay-status', 'Y');
				$(".board_ban .sd").slick('slickPlay');
				$(this).attr('title','슬라이드 정지').removeClass('on');
			}
			else if ($(".board_ban .sd").attr('data-slick-autoplay-status') == 'Y') {
				$(".board_ban .sd").attr('data-slick-autoplay-status', 'N');
				$(".board_ban .sd").slick('slickPause');
				$(this).attr('title','슬라이드 재생').addClass('on');
			}
		});
	}

	//faq_menu
	$(document).on('click', '.faq_menu dt > a', function (){
		var tDL = $(this).parents('dl');
		var tDD = $(this).parent('dt').next();
		if (tDD.is(':hidden')) {
			tDL.addClass('on').find('dd').slideDown();
		} else {
			tDL.removeClass('on').find('dd').slideUp();
		}
		return false;
	});
	// sub_left
	$(".content_left li > a").on('click',function(){
		console.log($(this).parent().hasClass("on"))
		if($(this).parent("li").hasClass("on") == true){
			$(this).parent("li").removeClass("on");
			$(".left_sub").hide();
		} else{
			$(".content_left li").removeClass("on");
			$(this).parent("li").addClass("on");
			$(this).next(".left_sub").show();
		}
	});

	//tab
	$.fn.tabContainer = function(){
		return this.each(function(){
			if ($(this).hasClass('nojs')){
				return false;
			}
			var tab_name = this.classList; //메인 교육과정
			var tabAnchor = $(this).find('> li');
			tabAnchor.each(function(){
				var menu = $(this);
				var target = $('#' + menu.find('>a').attr('href').split('#')[1]);
				var link = menu.find('>a');
				target.css('display', 'none');
				if (menu.hasClass('on')) {
					target.css('display', 'block');
				};
				link.click(function(){
					if (!$(this).parents('li').hasClass('on')) {
						tabAnchor.removeClass('on');
						tabAnchor.each(function(){
							$('#' + $(this).find('>a').attr('href').split('#')[1]).css('display', 'none');
						});
					menu.addClass('on');
					target.css('display', 'block');
					};
					if(tab_name == 'cs_tab'){
						$(".course .edu_li.sd").slick('refresh');
					}
					return false;
				});
			});
			//tabAnchor.eq(0).trigger('click');
		});
	};
	$('.cs_head .cs_tab, .nav_tabs, .nav_tabs2, .nav_tabs_in').tabContainer();
	
	//jquery ui datepicker
	$.datepicker.setDefaults({
		showOn:"both",
		buttonText: '',
		dateFormat: 'yy-mm-dd',
		changeYear: true,
		changeMonth: true,
		showMonthAfterYear: true,
		yearRange: "1900:+nn",
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });

	$(".btn_detail.down").click(function(){
		if($(this).hasClass("up")){
			$(this).removeClass("up")
			$(this).siblings(".ag_con").slideUp()
		}else{
			$(this).addClass("up")
			$(this).siblings(".ag_con").slideDown()
		}
	});

	// search_wrap
	$(".btn_ds").click(function(){
		var search_wrap =  $(".search_wrap")
		if(search_wrap.hasClass("on")){
			search_wrap.removeClass("on")
			$(this).removeClass("blue")
		}else{
			search_wrap.addClass("on")
			$(this).addClass("blue")

		}
	});
	
	$(".sort_form a").click(function(){
		$(".sort_form a").removeClass('on')
		$(this).addClass('on')
		if($(this).hasClass("img")){
			$(".edu_row").hide();
			$(".edu_col").css('display','flex');
		}else{
			$(".edu_col").hide();
			$(".edu_row").show();
		}
	})

	// 답지 스크롤에 따라 좌표값 변경
	var currentPosition = parseInt($(".exam_view .side").css("top"));
	$(window).scroll(function () {
		var position = $(window).scrollTop();
		if(position <= 0){
			$(".exam_view .side").removeAttr("style")
		}else{
			$(".exam_view .side").stop().css("top", position + currentPosition - 60 + "px")
		}
	});

	// 답지 모바일
	$(".cl_wrap .toggle").on("click",function(){
		$(".exam_view .side").addClass("on")
	});

	$(".exam_view .side .top .close").on("click",function(){
		$(".exam_view .side").removeClass("on")
	});

	$("[data-role='datepicker']" ).datepicker({
		showOn:"both",
		buttonText: '',
		dateFormat: 'yy-mm-dd',
		changeYear: true,
		yearRange: "1900:+nn"
	});
	
	// 체크박스
	$('input[type="checkbox"][name="specialty"]').click(function () {
		if ($(this).prop('checked')) {
			$('input[type="checkbox"][name="specialty"]').prop('checked', false);
			$(this).prop('checked', true);
		}
	});
	// 자격요건선택
	$(".require .li_02 li input[type=radio]").click(function(){
		$(".li_02 li").removeClass("on")
		$(this).parent().addClass("on")
	})
});

function onInfoView(idNum){
	$("#" + idNum).fadeIn()
}



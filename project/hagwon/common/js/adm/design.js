jQuery(function($){
	//layout
	$(".headtop-box>dd").hide();
	$(".headtop-box>dt").click(function(){
		if( $(this).next().is(":hidden") ) {
			$(this).removeClass("on").next().slideUp();
			$(this).addClass("on").next().slideDown();
		} else {
			$(this).removeClass("on").next().slideUp();
		}
		return false;
	});
	$(".icon-menu .over").hide();
	$(".icon-menu>a").click(function(){
		if( $(this).next().is(":hidden") ) {
			$(".icon-menu>a").removeClass("on").next().slideUp();
			$(this).addClass("on").next().slideDown();
		} else {
			$(this).removeClass("on").next().slideUp();
		}
		return false;
	});
	$(".gnb-wrap .k-menu").kendoMenu();
	$(".gnb-wrap .nav").kendoMenu();

	//manager dash menu
	$.fn.menuSlide = function(option){
		var config = {
			currentPosition : 0,
			prev : 'prev',
			next : 'next',
			container : 'slide-container',
			nav : 'control'
		};
		option = $.extend(config, option);
		return this.each(function(){
			$('.' + option.container, $(this)).css('overflow', 'hidden').children().wrapAll('<div class="slides_control"></div>');
			var  elem = $(this),
				control = $('.slides_control' ,elem),
				width = control.children().outerWidth(),
				total = control.children().size(),
				currentPosition = option.currentPosition;

				control.css('width', width * total);
				control.children().css({'float':'left', 'width':width});
				elem.prepend('<a href="#" class="'+ option.nav +' '+ option.prev +'">left</a>').append('<a href="#" class="'+ option.nav +' '+ option.next +'">right</a>');
				manageControls(currentPosition);

			$('.' + option.nav, elem).bind('click', function(e){
				e.preventDefault();
				currentPosition = $(this).hasClass('next') ? currentPosition+1 : currentPosition-1;
				manageControls(currentPosition);
				control.animate({
					'marginLeft' : width*(-currentPosition)
				});
			});

			function manageControls(position){
				if(position==0){$('.' + option.prev, elem).hide()}
				else{$('.' + option.prev, elem).show()}
				if(position==total-1){$('.' + option.next, elem).hide()}
				else{$('.' + option.next, elem).show()}
			};
		});
	};
	$('.manager .slide-menu').menuSlide();

	//k-menu
	//$(".gnb-wrap .k-menu").kendoMenu();
	//k-tab
	$(".k-tab-wrap .k-tab").kendoTabStrip({
		animation: {
			open: {
				effects: "fadeIn"
			}
		}
	});

	//tab
	$.fn.tabContainer = function(){
		return this.each(function(){
			if ($(this).hasClass('nojs')){
				return false;
			}
			var tabAnchor = $(this).find('> li');
			tabAnchor.each(function(){
				var menu = $(this);
				var target = $('#' + menu.find('>a').attr('href').split('#')[1]);
				target.css('display', 'none');
				if (menu.hasClass('on')) {
					target.css('display', 'block');
				};

				menu.click(function(){
					if (!$(this).hasClass('on')) {
						tabAnchor.removeClass('on');
						tabAnchor.each(function(){
							$('#' + $(this).find('>a').attr('href').split('#')[1]).css('display', 'none');
						});
					menu.addClass('on');
					target.css('display', 'block');
					};
					return false;
				});
			});
			//tabAnchor.eq(0).trigger('click');
		});
	};
	$('.nav_tabs, .nav_tabs2').tabContainer();

		//place_holder
	$.fn.place_holder = function(){
		return this.each(function(){
			var elem = $(this),
				label = $('label', elem).first(),
				input = $('input', elem).first();
			input.focus(function(){
				label.css('display', 'none');
			});
			input.blur(function(){
				if(!$(this).val()){
					label.css('display', 'block');
				}
			});
			if (input.val()){
				label.css('display', 'none');
			}
			//console.log('load')
		});
	};
	$('.c_panel.search .ph, .d_search .ph').place_holder();

	//cl_guide
	$(".cl_guide").on("click", function(e){
		e.preventDefault();
		var Layer = $(this).parents('tr').next('.cl_detail');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', '');
		} else {
			$(Layer).css('display', 'none');
		}
	});

	//gnb
	$.fn.gnb = function(){
		return this.each(function(){
			var nav = $(this),
			anchor = nav.find('> li > a'),
			nav_li = nav.find('> li');

			$menu.find('>li').each(function(){
				var $sub = $(this).find('> ul');
				if ($sub.length > 0) {
					$(this).find('> a').addClass('opener');
				}
				if ($(this).hasClass('on')) {
					$(this).find('>ul').css('display', 'block');
				};
			});

			anchor.on("focus", function(){
				$(this).siblings(".d1").css({opacity:1,top:'60px'});
			}).on("focusout", function(){
				$(this).siblings(".d1").css({opacity:0,top:'-9999px'});
			});
			nav_li.on("mouseover", function(){
				$(this).find(".d1").css({opacity:1,top:'60px'});
			}).on("mouseout", function(){
				$(this).find(".d1").css({opacity:0,top:'-9999px'});
			});
		});
	};

	(function() {
		var anchor = $("#nav_mn > li > a");
		var nav_li = $("#nav_mn > li");
		anchor.on("focus", function(){
			$(this).siblings(".d1").css({opacity:1,top:'60px'});
		}).on("focusout", function(){
			$(this).siblings(".d1").css({opacity:0,top:'-9999px'});
		});
		nav_li.on("mouseover", function(){
			$(this).find(".d1").css({opacity:1,top:'60px'});
		}).on("mouseout", function(){
			$(this).find(".d1").css({opacity:0,top:'-9999px'});
		});
	}());

	//snb
	var $li_has_on = $("#nav_mn > li.on");
	$("#nav_mn .d1 a").on("focusout", function(){
		$(this).closest("#nav_mn > li").removeClass("on");
		$li_has_on.addClass("on");
		$(this).parents(".d1").eq(0).css({opacity:0,top:'-9999px'});
	}).on("focus", function(){
		$(this).closest("#nav_mn > li").addClass("on");
		$(this).parents(".d1").eq(0).css({opacity:1,top:'60px'});
	});

	//cnt_search
	$(".d_search .app").click(function(e){
		var Layer =$(this).attr('href');
		e.preventDefault();
		if($(Layer).is(':hidden')){
			$(Layer).css('display', 'block');
			$(this).addClass('on');
		} else {
			$(Layer).css('display', 'none');
			$(this).removeClass('on');
		}
	});

	//new gnb
	(function() {
		var nav_li = $(".gnb-wrap .gnb > li");
		var anchor = nav_li.find('> a');
		nav_li.each(function(){
			var $sub = $(this).find('.d1');
			if ($sub.length > 0) {
				$(this).find('> a').append('<span class="k-icon k-i-arrow-s"></span>');
			}
		});
		anchor.on("focus", function(){
			$(this).siblings(".d1").css({opacity:1,top:'53px'});
		}).on("focusout", function(){
			$(this).siblings(".d1").css({opacity:0,top:'-9999px'});
		});
		nav_li.on("mouseover", function(){
			$(this).find(".d1").css({opacity:1,top:'53px'});
		}).on("mouseout", function(){
			$(this).find(".d1").css({opacity:0,top:'-9999px'});
		});
	}());

	//popup
	$('.c_dialog .p_close').on('click', function(e){
		e.preventDefault();
		var popup = $(this).parents('.c_dialog');
		//console.log(popup)
		if(popup.length > 0){
			popup.fadeOut();
		}
	});

	//lang
	$(".global .lang .on").click(function(){
		var box = $(".global .lang");
		box.toggleClass("open");
	});

	//lnb
	$.fn.lnb = function(){
		return this.each(function(){
			var $menu = $(this);
			$menu.find('li').each(function(){
				var $sub = $(this).find('ul');
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
				event.preventDefault();
				var $Layer = $(this).next('ul');
				if ($Layer.is(':hidden')){
					$(this).parent('li').addClass('on');
					$Layer.stop().slideDown();
				} else {
					$(this).parent('li').removeClass('on');
					$Layer.stop().slideUp();
				}
			});
		});
	};
	$('.nds .nav').lnb();

	//ord_li
	//$('.ord_li .next').click
	/* aside
	var aNav = $('.aside .nav');
	aNav.find('li.on').parents('li').addClass('on');
	aNav.find('li.on>ul').slideDown(300);
	aNav.find('a').click(function(e){
		e.preventDefault();
		t= $(this);
		if(t.parent('li').hasClass('on')){
			t.parent('li').removeClass('on').find('>ul').slideUp(300);
		}else{
			//t.parent('li').siblings().removeClass('on').find('>ul').slideUp(300);
			t.parent('li').addClass('on').find('>ul').slideDown(300);
		}
	});
	*/
});


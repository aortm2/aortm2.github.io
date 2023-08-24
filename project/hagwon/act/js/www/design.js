$(window).load(function(){
	scrollText();
	function scrollText() {
		if (0 != $(".ex .high").length && 0 != $(".ex .view").length) {
		var e = $($(".ex .high")[0]),
			a = $($(".ex .view")[0]),
			t = (a.scrollTop(), e.offset().top),
			n = (e.offset().top, e.height(), a.offset().top),
			o = a.offset().top + a.height();
			if (!(t - 50 >= n && t + 50 <= o)) {
				var i = t - n - 50,
				r = a[0].scrollTop + i;
				r < 0 && (r = 0), (a[0].scrollTop = r);
			}
		}
	}

	//toggleNext
	function toggleNext(event){
		var Layer = $(this).next();
		if($(Layer).is(':hidden')){
			$(this).addClass('on');
			$(Layer).css('display', 'block');
		} else {
			$(this).removeClass('on');
			$(Layer).css('display', 'none');
		}
		return false;
	};

	//sidr
	if ($('#sidr').length > 0){
		$('#sidr').panel({
			delay: 500,
			// hideOnClick: true,
			// hideOnSwipe: true,
			// resetScroll: true,
			// resetForms: true,
			// side: 'left',
			target: $('body'), //addClass
			visibleClass: 'menu_visible'
		});
	};

	//nav
	$.fn.nav = function(){
		return this.each(function(){
			var $menu = $(this);
			$menu.find('>li').each(function(){
				var $sub = $(this).find('> ul');
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
					$Layer.css('display', 'block');
				} else {
					$(this).parent('li').removeClass('on');
					$Layer.css('display', 'none');
				}
			});
		});
	};
	$('#sidr .nav').nav();

	//lnb
	$.fn.lnb = function(){
		return this.each(function(){
			var $menu = $(this);
			$menu.find('li').each(function(){
				var $sub = $(this).find('ul');
				if ($sub.length > 0) {
					$(this).find('> a').addClass('opener');
				}
				// if ($(this).hasClass('on')) {
				// 	$(this).find('>ul').css('display', 'block');
				// };
			});
			var $menu_openers = $menu.find('.opener');
			$menu_openers.on('click', function(e){
				event.preventDefault();
				var $Layer = $(this).next('ul');
				if ($Layer.is(':hidden')){
					$(this).parent('li').addClass('on');
					$Layer.css('display', 'block');
				} else {
					$(this).parent('li').removeClass('on');
					$Layer.css('display', 'none');
				}
			});
		});
	};
	$('.lnb .nav').lnb();

	//nav_index
	$.fn.nav_index = function(){
		return this.each(function(){
			var elem = $(this),
				selector = elem.find('.selector'),
				active = elem.find('.on a');
			if (active.length > 0){
				selector.css('width', active.outerWidth()).css('left', active.position().left)
				.data('origWidth', selector.width())
				.data('origLeft', selector.position().left);
			}
			//console.log(active.position().left);

			elem.find('li a').hover(function(){
				var $this = $(this);
				selector.css('width', $this.outerWidth());
				selector.css('left', $this.position().left);
			}, function(){
				if (active.length > 0){
					selector.css('width', selector.data('origWidth'));
					selector.css('left', selector.data('origLeft'));
				}
			});
		});
	};

	//gnb
	(function() {
		var anchor = $("#gnb > li > a");
		var nav_li = $("#gnb > li");
		anchor.on("focus", function(){
			$(this).parent("li").addClass('over');
		}).on("focusout", function(){
			$(this).parent("li").removeClass('over');
		});
		nav_li.on("mouseover", function(){
			$(this).addClass('over').siblings().removeClass('over');
		}).on("mouseout", function(){
			$(this).removeClass('over');
		});
	}());

	//snb
	var $li_has_on = $("#gnb > li.on");
	$(".snb li a").on("focusout", function(){
		if($('html').is('.w_large')){
			$(this).closest(".menu > li").removeClass("on");
			$li_has_on.addClass("on");
			$(this).parents("ul").eq(0).css({opacity:0,top:'-9999px'});
		}
	}).on("focus", function(){
		if($('html').is('.w_large')){
			$(this).closest(".menu > li").addClass("on");
			$(this).parents("ul").eq(0).css({opacity:1,top:'100%'});
		}
	});

	//quick
	(function(){
		var quickmenu = $('#quickmenu');
		var toggle = quickmenu.find('.toggle');
		toggle.on('click', function(e){
			e.preventDefault();
			if (!quickmenu.hasClass('off')){
				quickmenu.addClass('off').stop().animate({right : '-90px'}, 250);
			} else {
				quickmenu.removeClass('off').stop().animate({right : '0px'}, 250);
			}
		});
	}());
});
//onload

jQuery(function($){
	// $(window).on('load resize', function(){
	// 	setClassWinWidth();
	// });
	function setClassWinWidth(){
		var $html = $('html'),
			$winWidth = window.innerWidth;
		$html.removeClass('w_medium w_large');
		if($winWidth >980){
			$('html').addClass('w_large');
		}else{
			$('html').addClass('w_medium');
		}
	};

	//main slick
	if($('.main .visual').length > 0){
		$('.main .visual .sd').slick({
			arrows: false,
			dots: true,
			autoplay: true,
			autoplaySpeed: 5000,
			pauseOnHover: true,
			appendDots:$('.main .visual .dot')
		});
		var pause = $('.main .visual .pause'),
			play = $('.main .visual .play');
		$('.main .visual .pause').on('click', function(){
			$('.main .visual .sd').slick('slickPause').slick('slickSetOption', 'pauseOnHover', false);
			$(this).addClass('on');
			play.removeClass('on');
		});
		$('.main .visual .play').on('click', function(){
			$('.main .visual .sd').slick('slickPlay').slick('slickSetOption', 'pauseOnHover', true);
			$(this).addClass('on');
			pause.removeClass('on');
		});
	};
	if($('.main .edu .ban').length > 0){
		$('.main .edu .ban').slick({
			arrows: false,
			dots: true
		});
	};
	if($('.main .video').length > 0){
		$('.main .video').slick({
			arrows: false,
			dots: true
		});
	};

	if($('#link_service').length > 0){
		/* slideCount
		$('#link_service').on('init', function(event, slick){
			var total = parseInt(slick.slideCount / 4);
			if ((slick.slideCount % 4) > 0){
				total = total + 1;
			}
			$('#link_count').find('.total').text(total);
		});
		*/
		$('#link_service').slick({
			arrows: true,
			dots: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 980,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
		/* paging
		$('#link_service').on('afterChange', function(event, slick, currentSlide, nextSlide, sliders){
			var current = (currentSlide / 4) + 1;
			$('#link_count').find('.current').text(current);
			}
		);
		*/
	};

	//calendar
	$('.dash .calendar .mark').hover(function(){
		$(this).find('.info').show();
	}, function(){
		$(this).find('.info').hide();
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
	$('.nav_tabs, .nav_tabs2, .list_type, .c_tab, .c_tab1, .c_tab2, .c_tab3, .c_tab4, .gp.notice .tab, .task .tab').tabContainer();

	//toggleLayer
	function toggleLayer(event){
		var Layer = $(this).attr('href');
		if($(Layer).is(':hidden')){
			$(this).addClass('on');
			$(Layer).slideDown();
		} else {
			$(this).removeClass('on');
			$(Layer).slideUp();
		}
		return false;
	};
	$('.app_frame .more_vert').click(toggleLayer);

	//ds_box detail
	function toggleNext(event){
		var Layer = $(this).parent('.enter').next();
		if($(Layer).is(':hidden')){
			$(this).addClass('on');
			$(Layer).css('display', 'block');
		} else {
			$(this).removeClass('on');
			$(Layer).css('display', 'none');
		}
		return false;
	};
	$('.ds_box .dt').click(toggleNext);

	//popup
	$('.c_dialog .p_close').on('click', function(e){
		e.preventDefault();
		var popup = $(this).parents('.c_dialog');
		//console.log(popup)
		if(popup.length > 0){
			popup.fadeOut();
		}
	});

	//popup2
	$('.ct_dialog .p_close').on('click', function(e){
		e.preventDefault();
		var popup = $(this).parents('.ct_dialog');
		//console.log(popup)
		if(popup.length > 0){
			popup.fadeOut();
		}
	});

	//i_box
	$('.i_box .fold').click(function(e){
		var Layer = $(this).parents('.i_box').find('.fold_con');
		if($(Layer).is(':hidden')){
			$(Layer).slideDown();
		} else {
			$(Layer).slideUp();
		}
	});

	//lct_info
	$(".cd_list .head .fold").click(function(e){
		e.preventDefault();
		var Layer = $(this).parent().next('.ct');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', 'block');
		} else {
			$(Layer).css('display', 'none');
		}
	});

	//course poll
	$(".c_poll .fold").on("click", function(e){
		e.preventDefault();
		var Layer = $(this).next('.detail');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', 'block');
		} else {
			$(Layer).css('display', 'none');
		}
	});

	//course poll result
	$(".c_poll .right .fold").on("click", function(e){
		e.preventDefault();
		var Layer = $(this).parent().parent().next('.ex.desc');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', 'block');
		} else {
			$(Layer).css('display', 'none');
		}
	});
	$(".c_poll .article.desc .fold").on("click", function(e){
		e.preventDefault();
		var Layer = $(this).parent().parent().next('.ajax');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', 'block');
		} else {
			$(Layer).css('display', 'none');
		}
	});

	//course detail
	$(".study_tb .fold").on("click", function(e){
		e.preventDefault();
		var Layer = $(this).parent().next('.detail');
		if($(Layer).is(':hidden')){
			$(Layer).slideDown();
		} else {
			$(Layer).slideUp();
		}
	});

	//panel
	$.fn.panel = function(userConfig) {

		//No elements?
		if (this.length == 0)
			return $this;

		//Multiple elements?
		if (this.length > 1) {
			for (var i=0; i < this.length; i++)
				$(this[i]).panel(userConfig);
			return $this;
		}

		//Vars.
		var	$this = $(this),
			$body = $('body'),
			$window = $(window),
			id = $this.attr('id'),
			config;

		//Config.
		config = $.extend({

			//Delay.
			delay: 0,

			//Hide panel on link click.
			hideOnClick: false,

			//Hide panel on escape keypress.
			hideOnEscape: false,

			//Hide panel on swipe.
			hideOnSwipe: false,

			//Reset scroll position on hide.
			resetScroll: false,

			//Reset forms on hide.
			resetForms: false,

			//Side of viewport the panel will appear.
			side: null,

			//Target element for "class".
			target: $this,

			//Class to toggle.
			visibleClass: 'visible'

		}, userConfig);

		//Expand "target" if it's not a jQuery object already.
		if (typeof config.target != 'jQuery')
			config.target = $(config.target);

		//Panel.
		// Methods.
		$this._hide = function(event) {

			//Already hidden? Bail.
			if (!config.target.hasClass(config.visibleClass))
				return;

			//If an event was provided, cancel it.
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			//Hide.
			config.target.removeClass(config.visibleClass);

			//Post-hide stuff.
			window.setTimeout(function() {

			//Reset scroll position.
			if (config.resetScroll)
				$this.scrollTop(0);

			//Reset forms.
			if (config.resetForms)
				$this.find('form').each(function() {
					this.reset();
				});

			}, config.delay);

		};

		//Hide on click.
		if (config.hideOnClick) {

			$this.find('a').css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
			$this.on('click', 'a', function(event) {
				var $a = $(this),
					href = $a.attr('href'),
					target = $a.attr('target');

				if (!href || href == '#' || href == '' || href == '#' + id)
					return;

				//Cancel original event.
				event.preventDefault();
				event.stopPropagation();

				//Hide panel.
				$this._hide();

				//Redirect to href.
				window.setTimeout(function() {
					if (target == '_blank')
						window.open(href);
					else
						window.location.href = href;
				}, config.delay + 10);
			});
		}

		//Event: Prevent certain events inside the panel from bubbling.
		$this.on('click', function(event) {
			event.stopPropagation();
			$this._hide();
		})
		//20161102 : inbok
		.find('.inner').on('click', '.close', function(event) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			$this._hide();
		})
		.on('click', 'a[href="#' + id + '"]', function(event) {
			//console.log('here');
			event.preventDefault();
			event.stopPropagation();
			config.target.removeClass(config.visibleClass);
		})
		.on('click', function(event) {
			event.stopPropagation();
		});

		//Event: Toggle.
		$body.on('click', 'a[href="#' + id + '"]', function(event) {
			//console.log('click?');
			event.preventDefault();
			event.stopPropagation();
			config.target.toggleClass(config.visibleClass);
		});

		//Window.
		//Event: Hide on ESC.
		if (config.hideOnEscape)
			$window.on('keydown', function(event) {
				if (event.keyCode == 27)
					$this._hide(event);
			});
		return $this;
	};

	//aside_nav
	(function(){
		nav = $('#aside .nav');
		nav_li = $('#aside .nav > li');
		sub = nav_li.find('> .sub');
		bg = $('#aside .bg');
		nav.find('> li').each(function(){
			var List = $(this),
				sub_on = List.find('> .sub');
			List.click(function(){
				if (!$(this).hasClass('on')){
					nav_li.removeClass('on');
					sub.css('display', 'none');
				}
				List.addClass('on');
				sub_on.css('display', 'block');
				bg.css('display', 'block');
			});
			if (List.hasClass('on')){
				List.trigger('click');
			}
		});
	}());

	//faq-menu
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

	//acc-find
	(function(){
		var Link = $('.acc_find .link');
		var Layer = $('.acc_find .pop');
		Link.each(function(){
			var target = $(this).attr('href');
			if ($(this).hasClass('on')){
				$(target).css('display', 'block');
			};
			$(this).click(function(e){
				e.preventDefault();
				if (!$(this).hasClass('on')){
					Link.removeClass('on');
					Layer.css('display', 'none');
					$(this).addClass('on');
					$(target).css('display', 'block');
				};
			});
		});
	}());

	//sort_tab
	$.fn.sort_tab = function(){
		return this.each(function(){
			if ($(this).hasClass('nojs')){
				return false;
			}
			var list = $(this).find('> li');
			list.each(function(){
				var menu = $(this);
				if (menu.hasClass('on')) {
					menu.addClass('desc');
				};
				menu.click(function(e){
					e.preventDefault();
					if (!$(this).hasClass('on')){
						list.removeClass();
						menu.addClass('on desc');
					} else if ($(this).hasClass('desc')) {
						menu.removeClass('desc').addClass('asc');
					} else if ($(this).hasClass('asc')) {
						menu.removeClass('asc').addClass('desc');
					};
				});
			});
		});
	};
	$('.sort_tab').sort_tab();

	$.fn.treeNav = function(){
		return this.each(function(){
			var elem = $(this),
				plus = '<button type="button" class="plus">+</button>',
				minus ='<button type="button" class="minus">-</button>';
			elem.find('li>ul').parent('li').addClass('open').prepend(minus);
			toggle = elem.find('button');
			toggle.on('click', function(e){
				e.preventDefault();
				t= $(this);
				if(t.parent('li').hasClass('open')){
					t.text('+').removeClass('minus').addClass('plus');
					t.parent('li').find('>ul').css('display', 'none');
					t.parent('li').removeClass('open');
				}else{
					t.text('-').removeClass('plus').addClass('minus');
					t.parent('li').find('>ul').css('display', 'block');
					t.parent('li').addClass('open');
				}
			});
		});
	};
	$('.tree_li').treeNav();

	//surv_li
	$('.surv_li .all').click(function(e){
		e.preventDefault();
		var Layer = $('.surv_li .detail');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', 'block');
			$(this).addClass('on');
		} else {
			$(Layer).css('display', 'none');
			$(this).removeClass('on');
		}
	});

	//cnt_search
	$('.cnt_search .app').click(function(e){
		var Layer = $(this).parent().next('.detail');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', 'block');
			$(this).addClass('on');
		} else {
			$(Layer).css('display', 'none');
			$(this).removeClass('on');
		}
	});

	//lwd oer
	// $('.lwd.oer .sub, .lwd.oer .close').click(function(e){
	// 	var Layer = $('.lwd.oer .list');
	// 	if($(Layer).is(':hidden')){
	// 		$(Layer).css('display', 'block');
	// 		$(this).addClass('on');
	// 	} else {
	// 		$(Layer).css('display', 'none');
	// 		$(this).removeClass('on');
	// 	}
	// });

	//table toggle
	$(".tbl_col.tg .tb_link").on("click", function(e){
		e.preventDefault();
		var Layer = $(this).parents('tr').next('.tb_detail');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', '');
		} else {
			$(Layer).css('display', 'none');
		};
	});

	//class room, lct_view
	$('.lct_view .bar .fold').click(function(e){
		var Layer = $(this).parents('.bar').next('.detail');
		if($(Layer).is(':hidden')){
			$(Layer).slideDown();
		} else {
			$(Layer).slideUp();
		}
	});

	//button.fold
	$("button.fold").click(function(e){
		e.preventDefault();
		$(this).toggleClass('on');
	});

	//c_panel, ad_set
	$('.c_panel.tg .fold').on("click", function(e){
		e.preventDefault();
		var Layer = $(this).parent().parent().siblings('.p_body');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', 'block');
		} else {
			$(Layer).css('display', 'none');
		}
	});

	//cl_room task
	$('a[href="#cl_task"]').on('click', function(e){
		e.preventDefault();
		var layer = $('#cl_task');
		if (layer.is(':hidden')){
			$(this).parent('li').addClass('on');
			layer.css('display', 'block');
		} else {
			$(this).parent('li').removeClass('on');
			layer.css('display', 'none');
		}
	});

	//fx_box
	$('.fx_box').each(function(){
		$(this).append($('<span/>', {
			class: 'arrow'
		}));
		$(this).scroll(function(){
			$(this).find('.arrow').remove();
		});
	});

	$(".user .drop").on("click", function(e){
		e.preventDefault();
		var Layer = $(this).next('.d_menu');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', 'block');
		} else {
			$(Layer).css('display', 'none');
		};
	});

	//act nav
	$(".item_li .st_filter").on("click", function(e){
		e.preventDefault();
		var Layer = $(this).parents('tr').next('.nav_filter');
		if($(Layer).is(':hidden')){
			$(Layer).css('display', 'table-row');
		} else {
			$(Layer).css('display', 'none');
		};
	});
});
